"use client";

import React, { useEffect, useRef, useState } from "react";
import { runPythonCode, loadPyodide } from "@/lib/pyodide";
import { Play, RotateCcw, AlertTriangle, CheckCircle, Terminal, FileCode, Check, Sun, Moon } from "lucide-react";
import { Button } from "./ui/Button";

interface CodeEditorProps {
  initialCode: string;
  objective?: string;
  expectedOutput?: string;
  onSuccess?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  objective,
  expectedOutput,
  onSuccess,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<any>(null);
  
  const [code, setCode] = useState(initialCode);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [runStatus, setRunStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeConsoleTab, setActiveConsoleTab] = useState<"console" | "tests">("console");
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Load Pyodide on mount to make running faster
  useEffect(() => {
    loadPyodide()
      .then(() => setPyodideLoaded(true))
      .catch((err) => {
        console.error("Pyodide failed to load", err);
        setLoadError("Failed to initialize Python sandbox. Check internet connection.");
      });
  }, []);

  // Initialize CodeMirror 6
  useEffect(() => {
    if (typeof window === "undefined" || !editorRef.current) return;

    const initCodeMirror = async () => {
      const { EditorState } = await import("@codemirror/state");
      const { EditorView, keymap } = await import("@codemirror/view");
      const { defaultKeymap, history, historyKeymap } = await import("@codemirror/commands");
      const { python } = await import("@codemirror/lang-python");
      const { syntaxHighlighting, defaultHighlightStyle } = await import("@codemirror/language");

      const customTheme = EditorView.theme(
        {
          "&": {
            color: isDarkTheme ? "#D4D4D4" : "#1C1D1F",
            backgroundColor: isDarkTheme ? "#1E1E1E" : "#FFFFFF",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "13.5px",
            height: "100%",
          },
          ".cm-content": {
            caretColor: "#A435F0",
            padding: "16px 0",
          },
          ".cm-line": {
            padding: "0 16px",
          },
          "&.cm-focused .cm-cursor": {
            borderLeftColor: "#A435F0",
            borderLeftWidth: "2px",
          },
          "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: isDarkTheme ? "rgba(164, 53, 240, 0.25)" : "rgba(164, 53, 240, 0.15)",
          },
          ".cm-gutters": {
            backgroundColor: isDarkTheme ? "#1E1E1E" : "#F8F9FA",
            color: isDarkTheme ? "#858585" : "#6A6F73",
            borderRight: isDarkTheme ? "1px solid #2D2D2D" : "1px solid #D1D7DC",
            paddingTop: "16px",
          },
          ".cm-gutterElement": {
            padding: "0 10px 0 12px",
          },
          ".cm-activeLineGutter": {
            backgroundColor: isDarkTheme ? "#2A2A2A" : "#F0F0F0",
            color: isDarkTheme ? "#D4D4D4" : "#1C1D1F",
          },
          ".cm-activeLine": {
            backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
          },
        },
        { dark: isDarkTheme }
      );

      const state = EditorState.create({
        doc: code,
        extensions: [
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          python(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          customTheme,
          EditorView.updateListener.of((update: any) => {
            if (update.docChanged) {
              setCode(update.state.doc.toString());
            }
          }),
        ],
      });

      if (viewRef.current) {
        viewRef.current.destroy();
      }

      const container = editorRef.current;
      if (!container) return;

      const view = new EditorView({
        state,
        parent: container,
      });

      viewRef.current = view;
    };

    initCodeMirror();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [isDarkTheme]);

  // Update editor doc when initialCode changes (switching lessons)
  useEffect(() => {
    if (viewRef.current) {
      const currentDoc = viewRef.current.state.doc.toString();
      if (currentDoc !== initialCode) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: initialCode },
        });
        setCode(initialCode);
      }
    }
  }, [initialCode]);

  const handleRun = async () => {
    setIsRunning(true);
    setStdout("");
    setStderr("");
    setRunStatus("idle");

    let accumulatedStdout = "";
    let accumulatedStderr = "";

    try {
      const result = await runPythonCode(
        code,
        (text) => {
          accumulatedStdout += text;
          setStdout((prev) => prev + text);
        },
        (text) => {
          accumulatedStderr += text;
          setStderr((prev) => prev + text);
        }
      );

      if (!result.success) {
        setRunStatus("error");
      } else {
        // Assertions check against expectedOutput if supplied
        let isCorrect = true;
        if (expectedOutput) {
          // Normalize string comparison
          const cleanStdout = accumulatedStdout.replace(/\r?\n/g, "\n").trim();
          const cleanExpected = expectedOutput.replace(/\\n/g, "\n").replace(/\r?\n/g, "\n").trim();
          isCorrect = cleanStdout.includes(cleanExpected) || cleanStdout === cleanExpected;
        }

        if (isCorrect) {
          setRunStatus("success");
          if (onSuccess) onSuccess();
        } else {
          setRunStatus("error");
        }
      }
    } catch (err: any) {
      setStderr((prev) => prev + (err.message || String(err)));
      setRunStatus("error");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.toString().length, insert: initialCode },
      });
      setCode(initialCode);
    }
    setStdout("");
    setStderr("");
    setRunStatus("idle");
  };

  return (
    <div className={`flex flex-col h-full border-l transition-colors duration-200 ${
      isDarkTheme ? "bg-[#1E1E1E] text-[#D4D4D4] border-[#2D2F31]" : "bg-white text-[#1C1D1F] border-[#D1D7DC]"
    }`}>
      
      {/* Editor Titlebar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b select-none transition-colors duration-200 ${
        isDarkTheme ? "bg-[#252526] border-[#2D2D2D]" : "bg-[#F8F9FA] border-[#D1D7DC]"
      }`}>
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#A435F0]" />
          <span className={`text-xs font-mono transition-colors ${isDarkTheme ? "text-white" : "text-[#1C1D1F]"}`}>
            main.py
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!pyodideLoaded && !loadError && (
            <span className="text-[10px] text-[#A435F0] flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A435F0] animate-ping" />
              Initializing Python WASM...
            </span>
          )}
          {pyodideLoaded && (
            <span className="text-[10px] text-[#1C824E] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C824E]" />
              Python 3.11 Online
            </span>
          )}
          {loadError && (
            <span className="text-[10px] text-red flex items-center gap-1 font-mono">
              <AlertTriangle className="w-3 h-3" />
              Sandbox Offline
            </span>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className={`relative flex-1 overflow-hidden transition-colors duration-200 ${
        isDarkTheme ? "bg-[#1E1E1E]" : "bg-white"
      }`}>
        <div ref={editorRef} className="w-full h-full" />
      </div>

      {/* Workspace Control Bar */}
      <div className={`flex items-center justify-between px-4 py-2.5 border-t border-b select-none transition-colors duration-200 ${
        isDarkTheme ? "bg-[#252526] border-[#2D2D2D]" : "bg-[#F8F9FA] border-[#D1D7DC]"
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning || !pyodideLoaded}
            className="h-9 px-4 rounded-md bg-[#A435F0] hover:bg-[#8B1AD3] active:scale-98 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A435F0] disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-md shadow-[#A435F0]/15"
          >
            {isRunning ? (
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>Run Script</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isRunning}
            className="h-9 px-4 rounded-md border-2 border-[#A435F0] bg-[#A435F0]/10 hover:bg-[#A435F0] hover:text-white active:scale-98 text-[#A435F0] font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A435F0] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {objective && (
            <div className={`hidden lg:flex items-center gap-2 max-w-[200px] text-right text-xs transition-colors ${
              isDarkTheme ? "text-[#9C9EA6]" : "text-[#6A6F73]"
            }`}>
              <span className="font-bold text-[#A435F0] text-[10px] uppercase tracking-wider">OBJECTIVE:</span>
              <span className="truncate">{objective}</span>
            </div>
          )}
          
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={`p-1.5 rounded-md border transition-all cursor-pointer ${
              isDarkTheme 
                ? "bg-[#1E1E1E] border-[#2D2D2D] text-white hover:bg-[#2D2D2D]" 
                : "bg-white border-[#D1D7DC] text-[#1C1D1F] hover:bg-[#F8F9FA]"
            }`}
            title="Toggle theme"
          >
            {isDarkTheme ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#A435F0]" />
            )}
          </button>
        </div>
      </div>

      {/* Output Console (VS Code Vibe) */}
      <div className={`h-[220px] flex flex-col border-t transition-colors duration-200 ${
        isDarkTheme ? "bg-[#282829] border-[#2D2D2D]" : "bg-[#F8F9FA] border-[#D1D7DC]"
      }`}>
        
        {/* Terminal Header Tabs */}
        <div className={`flex items-center justify-between px-4 border-b select-none transition-colors duration-200 ${
          isDarkTheme ? "bg-[#252526] border-[#2D2D2D]" : "bg-white border-[#D1D7DC]"
        }`}>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveConsoleTab("console")}
              className={`px-3 py-2 text-xs font-bold font-mono border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeConsoleTab === "console"
                  ? (isDarkTheme ? "border-[#A435F0] text-white" : "border-[#A435F0] text-[#A435F0]")
                  : (isDarkTheme ? "border-transparent text-[#858585] hover:text-white" : "border-transparent text-[#6A6F73] hover:text-[#1C1D1F]")
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Output Terminal
            </button>
            <button
              onClick={() => setActiveConsoleTab("tests")}
              className={`px-3 py-2 text-xs font-bold font-mono border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeConsoleTab === "tests"
                  ? (isDarkTheme ? "border-[#A435F0] text-white" : "border-[#A435F0] text-[#A435F0]")
                  : (isDarkTheme ? "border-transparent text-[#858585] hover:text-white" : "border-transparent text-[#6A6F73] hover:text-[#1C1D1F]")
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Test Assertions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className={`flex-1 p-4 font-mono text-xs overflow-y-auto transition-colors duration-200 ${
          isDarkTheme ? "bg-[#282829] text-[#D4D4D4]" : "bg-white text-[#2D2F31]"
        }`}>
          {activeConsoleTab === "console" ? (
            <div className="space-y-1.5">
              {stdout && (
                <pre className="text-[#34A853] leading-relaxed whitespace-pre-wrap font-mono">{stdout}</pre>
              )}

              {stderr && (
                <pre className="text-[#EA4335] leading-relaxed whitespace-pre-wrap font-mono">{stderr}</pre>
              )}

              {!stdout && !stderr && !isRunning && (
                <span className={`italic select-none transition-colors ${
                  isDarkTheme ? "text-[#858585]" : "text-[#6A6F73]"
                }`}>
                  Run your code. System outputs will print here.
                </span>
              )}

              {isRunning && (
                <span className="text-[#A435F0] animate-pulse select-none">
                  Compiling and evaluating in Pyodide WebAssembly sandbox...
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className={`flex items-center gap-2 border-b pb-1.5 select-none transition-colors ${
                isDarkTheme ? "border-[#2D2D2D]" : "border-[#D1D7DC]"
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isDarkTheme ? "text-white" : "text-[#1C1D1F]"
                }`}>
                  Test Suite Suite-1:
                </span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  {runStatus === "success" ? (
                    <Check className="w-4 h-4 text-[#1C824E] shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-[#858585] shrink-0" />
                  )}
                  <div className="space-y-0.5">
                    <span className={`font-semibold block transition-colors ${
                      isDarkTheme ? "text-white" : "text-[#1C1D1F]"
                    }`}>
                      Compile Check
                    </span>
                    <span className={`text-[10px] transition-colors ${
                      isDarkTheme ? "text-[#858585]" : "text-[#6A6F73]"
                    }`}>
                      Verify the Python interpreter parses the code structure.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  {runStatus === "success" ? (
                    <Check className="w-4 h-4 text-[#1C824E] shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-[#858585] shrink-0" />
                  )}
                  <div className="space-y-0.5">
                    <span className={`font-semibold block transition-colors ${
                      isDarkTheme ? "text-white" : "text-[#1C1D1F]"
                    }`}>
                      Execution Check
                    </span>
                    <span className={`text-[10px] transition-colors ${
                      isDarkTheme ? "text-[#858585]" : "text-[#6A6F73]"
                    }`}>
                      Verify the code runs to completion with exit code 0.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default CodeEditor;
