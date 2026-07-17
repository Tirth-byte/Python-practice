let pyodideInstance: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

export async function loadPyodide(): Promise<any> {
  if (typeof window === "undefined") return null;
  
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    // Check if script is already present
    if ((window as any).loadPyodide) {
      (window as any)
        .loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
        })
        .then((py: any) => {
          pyodideInstance = py;
          resolve(py);
        })
        .catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
    script.async = true;
    script.onload = async () => {
      try {
        const loadPyodideFn = (window as any).loadPyodide;
        if (!loadPyodideFn) {
          throw new Error("loadPyodide not found on window object");
        }
        const py = await loadPyodideFn({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
        });
        pyodideInstance = py;
        resolve(py);
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = (err) => {
      reject(new Error("Failed to load Pyodide CDN script"));
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}

export async function runPythonCode(
  code: string,
  onStdout: (text: string) => void,
  onStderr: (text: string) => void,
  stdinInput: string = ""
): Promise<{ success: boolean; result?: any; error?: string }> {
  try {
    const py = await loadPyodide();
    if (!py) {
      return { success: false, error: "Pyodide could not be loaded on the server" };
    }

    // Set up standard output redirect
    let outputBuffer = "";
    let errorBuffer = "";
    
    py.setStdout({
      batched: (text: string) => {
        onStdout(text + "\n");
        outputBuffer += text + "\n";
      },
    });

    py.setStderr({
      batched: (text: string) => {
        onStderr(text + "\n");
        errorBuffer += text + "\n";
      },
    });

    // Run the code
    const result = await py.runPythonAsync(code);
    return { success: true, result };
  } catch (err: any) {
    const errMsg = err.message || String(err);
    onStderr(errMsg + "\n");
    return { success: false, error: errMsg };
  }
}
