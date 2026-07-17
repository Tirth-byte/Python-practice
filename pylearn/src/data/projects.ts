export interface Project {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  requires: string[];
  description: string;
  resources: string[];
}

export const seedProjects: Project[] = [
  {
    id: "number-guessing",
    title: "Number Guessing Game",
    level: "Beginner",
    requires: ["Variables", "input()", "Conditionals"],
    description: "The computer picks a random secret number. The player guesses the number, and the computer provides 'Too high' or 'Too low' hints until the player gets it right.",
    resources: ["Python random module docs", "Lesson: Conditionals", "Lesson: input()"]
  },
  {
    id: "tip-calculator",
    title: "Tip Calculator",
    level: "Beginner",
    requires: ["Variables", "Operators", "input()"],
    description: "Split a restaurant bill among friends and compute the correct tip percentage per person. Practice floats, calculations, and inputs.",
    resources: ["Lesson: Operators", "Lesson: Data types", "Python type casting guide"]
  },
  {
    id: "mad-libs",
    title: "Mad Libs Generator",
    level: "Beginner",
    requires: ["Strings", "input()"],
    description: "Ask the user for words (nouns, verbs, adjectives) and fill out a hidden template story for a funny, custom generated response.",
    resources: ["Lesson: Strings", "String concatenation vs f-strings"]
  },
  {
    id: "rock-paper-scissors",
    title: "Rock · Paper · Scissors",
    level: "Intermediate",
    requires: ["Conditionals", "Operators"],
    description: "Play classic Rock-Paper-Scissors against a computer bot. Keep track of scores, validate inputs, and implement nested logic.",
    resources: ["Control flow guidelines", "Logic validation in loops"]
  }
];
