export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  type: "lesson" | "quiz" | "project";
  track: "both" | "school" | "graduate";
  schoolBody: string;
  graduateBody: string;
  starterCode: string;
  objective: string;
  exampleBox: string;
  sectionId: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  level: string;
  lessonsCount: number;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  promise: string;
  whatYouWillLearn: string[];
  requirements: string[];
  sections: Section[];
}

export const seedCourses: Course[] = [
  {
    id: "1",
    slug: "introduction-to-programming",
    title: "Introduction to Programming",
    level: "Both tracks",
    lessonsCount: 4,
    duration: "1.5h",
    price: "Free",
    rating: 4.9,
    reviewsCount: 1204,
    promise: "Understand how programs actually think — before you write a single line.",
    whatYouWillLearn: [
      "What a program is (Input → Process → Output)",
      "Why computers do exactly what you say",
      "Why Python (vs C)",
      "What IDEs are and when to use them"
    ],
    requirements: ["None — a laptop and curiosity."],
    sections: [
      {
        id: "c1-s1",
        title: "Foundations",
        lessons: [
          {
            id: "c1-l1",
            slug: "what-is-a-program",
            title: "What is a program?",
            duration: "6 min",
            type: "lesson",
            track: "both",
            schoolBody: "A program is like a cooking recipe. You give the computer some raw ingredients (inputs), it follows a list of steps (processing), and serves you a finished dish (outputs)!",
            graduateBody: "A program is a sequence of deterministic instructions executed by a CPU. It adheres strictly to the Input-Process-Output (IPO) model: taking input from standard sources, performing calculations, and outputting to standard output or storage.",
            starterCode: "# Example of Input -> Process -> Output\nname = \"Learner\"\ngreeting = \"Hello, \" + name\nprint(greeting)",
            objective: "Understand the Input-Process-Output structure of a program.",
            exampleBox: "Input: 'Learner' -> Process: concatenate 'Hello, ' -> Output: 'Hello, Learner'",
            sectionId: "c1-s1"
          },
          {
            id: "c1-l2",
            slug: "computer-only-does-what-you-say",
            title: "The computer only does what you say",
            duration: "7 min",
            type: "lesson",
            track: "both",
            schoolBody: "Computers are super fast, but they aren't smart enough to guess what you mean. They will do EXACTLY what you write down. If you make a small spelling mistake, they will get confused!",
            graduateBody: "Computers execute instruction streams with perfect fidelity but zero semantic understanding. Syntax errors prevent successful parsing/compilation, while logical bugs represent valid code that runs but produces unintended output.",
            starterCode: "# Correct this code to run successfully\n# print(hello)\nprint(\"hello\")",
            objective: "Differentiate between syntax errors and logical flow.",
            exampleBox: "print(\"hello\") -> Output: hello",
            sectionId: "c1-s1"
          },
          {
            id: "c1-l3",
            slug: "why-python-python-vs-c",
            title: "Why Python? Python vs C",
            duration: "8 min",
            type: "lesson",
            track: "graduate",
            schoolBody: "Python is like writing in English. It is clean and friendly. Other languages, like C, require you to manage computer memory manually, which is like driving a manual car without power steering!",
            graduateBody: "Python is an interpreted, dynamically-typed high-level language with automatic memory management (garbage collection). C is a compiled, statically-typed low-level language. Python values developer velocity; C values execution efficiency and hardware control.",
            starterCode: "# Python handles variable declarations automatically\nx = 10\nprint(\"Python variable x:\", x)",
            objective: "Understand high-level vs low-level languages and interpreting vs compiling.",
            exampleBox: "Python: x = 10 -> C: int x = 10;",
            sectionId: "c1-s1"
          },
          {
            id: "c1-l4",
            slug: "platforms-and-ides",
            title: "Platforms & IDEs",
            duration: "9 min",
            type: "lesson",
            track: "graduate",
            schoolBody: "An IDE (Integrated Development Environment) is just a fancy word for a notebook made specifically for writing code. It highlights spelling mistakes, runs your code with one button, and holds your files.",
            graduateBody: "An IDE coordinates source code editing, build automation, and debugging in a single interface. Key alternatives include modular editors like VS Code, full IDEs like PyCharm, or REPL-based browser environments like this Pyodide workspace.",
            starterCode: "import sys\nprint(\"Python interpreter version:\", sys.version)",
            objective: "Understand how IDEs enhance developer productivity.",
            exampleBox: "VS Code / PyCharm / In-Browser Editor",
            sectionId: "c1-s1"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    slug: "introduction-to-python",
    title: "Introduction to Python",
    level: "Both tracks",
    lessonsCount: 7,
    duration: "3h",
    price: "Free",
    rating: 4.8,
    reviewsCount: 2536,
    promise: "Write, run and reason about real Python — from print() to conditionals.",
    whatYouWillLearn: [
      "Print & output",
      "Variables & assignment",
      "Dynamic data types",
      "User input via input()",
      "Arithmetic operators",
      "String formatting & concatenation",
      "Decision making with if / elif / else"
    ],
    requirements: ["Completion of Introduction to Programming recommended."],
    sections: [
      {
        id: "c2-s1",
        title: "Python basics",
        lessons: [
          {
            id: "c2-l1",
            slug: "print-and-output",
            title: "print() and output",
            duration: "8 min",
            type: "lesson",
            track: "both",
            schoolBody: "print() is how the computer talks to you. Whatever you put inside the quotes, it shows on the screen. The words always go inside \" \" — change them below and run it to see what happens.",
            graduateBody: "print() sends output to standard output — the simplest way to display text or values. Text goes in quotes (a string); numbers and expressions don't need quotes, Python evaluates them first. Pass several items separated by commas, and sep= controls what joins them.",
            starterCode: "print(\"Hello, world\")\nprint(\"Sum is\", 2 + 3)\nprint(\"A\", \"B\", sep=\"-\")",
            objective: "Print text and values to the console using print().",
            exampleBox: "print(\"Hello!\") -> Hello!",
            sectionId: "c2-s1"
          },
          {
            id: "c2-l2",
            slug: "variables",
            title: "Variables",
            duration: "10 min",
            type: "lesson",
            track: "both",
            schoolBody: "A variable is like a labelled box where you keep a value. Give the box a name, put something in it, and use it later whenever you want!",
            graduateBody: "A variable is a symbolic name referring to an object in memory. `=` is the assignment operator, binding a name to a value. Names must start with a letter or underscore, are case-sensitive, and variables can be rebound to different types at any time.",
            starterCode: "name = \"Tirth\"\nage = 19\nprint(\"Name:\", name)\nprint(\"Age:\", age)",
            objective: "Create and assign values to variables, and retrieve them.",
            exampleBox: "x = 5 -> print(x) -> 5",
            sectionId: "c2-s1"
          },
          {
            id: "c2-l3",
            slug: "data-types",
            title: "Data types",
            duration: "12 min",
            type: "lesson",
            track: "both",
            schoolBody: "Different values have different types! Whole numbers are ints (5), decimal numbers are floats (3.14), text is a string (\"apple\"), and true/false values are booleans (True or False).",
            graduateBody: "Python is dynamically typed. Data types include integer (int), floating-point (float), string (str), and boolean (bool). The type is checked at runtime and can be queried using the type() function. Note that adding two strings concatenates them, while adding numbers does arithmetic.",
            starterCode: "x = 5\ny = 3.14\ntext = \"apple\"\nis_active = True\n\nprint(type(x))\nprint(type(text))\nprint(\"5\" + \"5\") # String concatenation\nprint(5 + 5)     # Arithmetic addition",
            objective: "Identify and use different basic data types: int, float, str, and bool.",
            exampleBox: "type(5) -> <class 'int'>\ntype('hello') -> <class 'str'>",
            sectionId: "c2-s1"
          },
          {
            id: "c2-l4",
            slug: "input",
            title: "input()",
            duration: "10 min",
            type: "lesson",
            track: "both",
            schoolBody: "input() is how the computer listens to you! It pauses the program and waits for you to type something, then stores it as text. Remember, even if you type a number, input() makes it a string!",
            graduateBody: "input() reads a line from standard input, returning it as a string (str). If you need a numeric type (int/float) for calculations, you must perform an explicit type conversion (casting) like int(input()).",
            starterCode: "name = input(\"What is your name? \")\nprint(\"Nice to meet you, \" + name)\n\n# Try typing a number below\nage_str = input(\"Enter your age: \")\n# age = int(age_str)  # Cast to integer for calculations\nprint(\"Double age as text:\", age_str * 2)",
            objective: "Read text from the user using input() and understand dynamic inputs.",
            exampleBox: "val = input() -> typed: 5 -> val is '5' (str)",
            sectionId: "c2-s1"
          },
          {
            id: "c2-l5",
            slug: "operators",
            title: "Operators",
            duration: "10 min",
            type: "lesson",
            track: "both",
            schoolBody: "Operators are basic math symbols! + (plus), - (minus), * (multiply), and / (divide). We also have % (modulo, which gives the remainder of a division) and ** (exponentiation, for powers).",
            graduateBody: "Standard operators include basic arithmetic (+, -, *, /). In addition, Python supports floor division (//), modulo remainder (%), and exponentiation (**). Operator precedence follows standard algebraic rules (PEMDAS).",
            starterCode: "print(\"Floor Division 10 // 3:\", 10 // 3)\nprint(\"Modulo 10 % 3 (Remainder):\", 10 % 3)\nprint(\"Power 2 ** 3:\", 2 ** 3)",
            objective: "Apply mathematical operators to solve arithmetic problems.",
            exampleBox: "10 // 3 -> 3\n10 % 3 -> 1\n2 ** 3 -> 8",
            sectionId: "c2-s1"
          },
          {
            id: "c2-l6",
            slug: "strings",
            title: "Strings",
            duration: "12 min",
            type: "lesson",
            track: "both",
            schoolBody: "Strings are sequences of text. You can join them using +, multiply them to repeat them, or use a special f-string like f'Hello {name}' to easily insert variables directly into your sentences!",
            graduateBody: "Strings (str) in Python are immutable Unicode sequences. We can perform concatenation (+), repetition (*), or string formatting. Modern Python uses f-strings (formatted string literals) for readable interpolation, prefixing the string with `f` and wrapping variables in curly braces `{}`.",
            starterCode: "mascot = \"Koji\"\ngreeting = f\"Say hello to {mascot}!\"\nprint(greeting)\nprint(\"Run! \" * 3)",
            objective: "Manipulate text data and format strings using f-strings.",
            exampleBox: "name = 'Koji' -> f'Hello {name}' -> 'Hello Koji'",
            sectionId: "c2-s1"
          },
          {
            id: "c2-l7",
            slug: "conditionals",
            title: "Conditionals",
            duration: "15 min",
            type: "lesson",
            track: "both",
            schoolBody: "Conditionals let your code make decisions! Use `if` to check a condition. If it is true, do something. Use `elif` to check other conditions if the first was false. Use `else` for anything else!",
            graduateBody: "Conditionals implement branching control flow. Indentation (4 spaces by convention) defines code blocks. Conditions are boolean expressions evaluated using comparison operators (==, !=, <, >, <=, >=) and logical operators (and, or, not).",
            starterCode: "score = 85\nif score >= 90:\n    print(\"Grade: A\")\nelif score >= 80:\n    print(\"Grade: B\")\nelse:\n    print(\"Grade: C\")",
            objective: "Write conditional blocks using if, elif, and else to control program paths.",
            exampleBox: "x = 5 -> if x > 0: print('Positive') -> Output: Positive",
            sectionId: "c2-s1"
          }
        ]
      }
    ]
  }
];
