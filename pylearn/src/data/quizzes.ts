export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  why: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseSlug: string;
  questions: QuizQuestion[];
}

export const seedQuizzes: Quiz[] = [
  {
    id: "q-foundations",
    title: "Foundations Quiz",
    courseSlug: "introduction-to-programming",
    questions: [
      {
        id: "q-f1",
        question: "What is the core model that programs follow to interact with data?",
        options: [
          "Input → Process → Output",
          "Read → Format → Loop",
          "Compile → Bind → Execute",
          "Input → Check → Save"
        ],
        answer: "Input → Process → Output",
        why: "Programs follow the Input-Process-Output (IPO) model to receive data, compute or manipulate it, and present the result."
      },
      {
        id: "q-f2",
        question: "Why do syntax errors happen?",
        options: [
          "The computer makes a calculation mistake",
          "The programmer typed instructions that violate the language's grammar rules",
          "The computer ran out of memory",
          "The user entered bad input"
        ],
        answer: "The programmer typed instructions that violate the language's grammar rules",
        why: "Syntax errors occur when code grammar is incorrect, meaning the computer cannot interpret or parse the instructions."
      }
    ]
  },
  {
    id: "q-basics",
    title: "Python Basics Quiz",
    courseSlug: "introduction-to-python",
    questions: [
      {
        id: "q-b1",
        question: "What does print(\"5\" + \"5\") display?",
        options: ["10", "\"55\"", "55", "Error"],
        answer: "55",
        why: "Two strings joined with `+` are concatenated (glued together), so '5' + '5' evaluates to '55' as text, not 10."
      },
      {
        id: "q-b2",
        question: "What data type does the input() function always return in Python?",
        options: ["int", "str", "bool", "depends on what the user typed"],
        answer: "str",
        why: "input() always reads input as plain text (a string). If you want a number, you must cast it with int() or float()."
      },
      {
        id: "q-b3",
        question: "Which of the following expressions checks if a number n is even?",
        options: ["n / 2 == 0", "n % 2 == 0", "n // 2 == 0", "n ** 2 == 0"],
        answer: "n % 2 == 0",
        why: "`%` is the modulo operator which calculates the division remainder. If n % 2 is 0, the number is divisible by 2 and thus even."
      },
      {
        id: "q-b4",
        question: "What does the expression 2 ** 3 equal in Python?",
        options: ["6", "8", "9", "5"],
        answer: "8",
        why: "In Python, `**` is the exponentiation operator. So 2 ** 3 means 2 raised to the power of 3, which is 2 * 2 * 2 = 8."
      }
    ]
  }
];
