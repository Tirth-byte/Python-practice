"use client";

import React, { useState } from "react";
import { seedQuizzes, Quiz, QuizQuestion } from "@/data/quizzes";
import { Button } from "@/components/ui/Button";
import { ProgressRing, ProgressBar } from "@/components/Progress";
import { Koji } from "@/components/Koji";
import { CheckCircle2, AlertTriangle, Play, RefreshCw, Trophy, ArrowRight } from "lucide-react";

export default function PracticePage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedQuiz || !selectedOption || isSubmitted) return;

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="space-y-8 select-none py-4">
      {/* Header */}
      {!selectedQuiz && (
        <div className="border-b border-line pb-6">
          <h1 className="font-fraunces text-scale-h1 font-semibold text-ink leading-tight">
            Practice Center
          </h1>
          <p className="text-scale-small text-ink-2 mt-1">
            Test your understanding with conceptual multiple-choice questions. Earn 15 XP per correct answer!
          </p>
        </div>
      )}

      {/* Quiz Selector Grid */}
      {!selectedQuiz && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seedQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-surface border border-line rounded-lg p-6 flex flex-col justify-between space-y-6 hover:shadow-custom duration-200 transition-all"
            >
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-wider font-bold text-gold-ink">
                  QUIZ BANK
                </span>
                <h3 className="font-fraunces text-scale-h3 font-semibold text-ink leading-tight">
                  {quiz.title}
                </h3>
                <p className="text-xs text-ink-2">
                  Contains {quiz.questions.length} multiple-choice concept checks on syntax structure.
                </p>
              </div>

              <Button
                variant="secondary"
                onClick={() => startQuiz(quiz)}
                className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Start Quiz
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Quiz Runner */}
      {selectedQuiz && !quizFinished && (
        <div className="max-w-2xl mx-auto bg-surface border border-line-strong rounded-xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Quiz Top bar */}
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-ink-3 uppercase">
                {selectedQuiz.title}
              </span>
              <h2 className="text-scale-h3 font-semibold text-ink">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </h2>
            </div>
            <button onClick={resetQuiz} className="text-xs font-semibold text-red hover:underline">
              Quit
            </button>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            percentage={((currentQuestionIndex) / selectedQuiz.questions.length) * 100}
          />

          {/* Question Text */}
          <div className="space-y-5">
            <p className="font-semibold text-scale-body text-ink leading-relaxed">
              {selectedQuiz.questions[currentQuestionIndex].question}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {selectedQuiz.questions[currentQuestionIndex].options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === selectedQuiz.questions[currentQuestionIndex].answer;
                
                let optionStyle = "border-line bg-surface hover:border-line-strong hover:bg-surface-sink/30";
                if (isSelected) {
                  optionStyle = "border-ink bg-surface-sink/40 font-semibold";
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "border-green bg-green-soft text-green font-semibold";
                  } else if (isSelected) {
                    optionStyle = "border-red bg-red-soft text-red font-semibold";
                  } else {
                    optionStyle = "border-line bg-surface opacity-55";
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all text-xs flex justify-between items-center cursor-pointer ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-green" />}
                    {isSubmitted && isSelected && !isCorrect && <AlertTriangle className="w-4 h-4 text-red" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Alert Box */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-lg border text-xs leading-relaxed space-y-1.5 flex gap-3 ${
                selectedOption === selectedQuiz.questions[currentQuestionIndex].answer
                  ? "bg-green-soft border-green/20 text-ink-2"
                  : "bg-red-soft border-red/20 text-ink-2"
              }`}
            >
              <Koji width={52} height={52} expression={selectedOption === selectedQuiz.questions[currentQuestionIndex].answer ? "celebrating" : "thinking"} className="shrink-0" />
              <div>
                <span className="font-bold block text-ink">
                  {selectedOption === selectedQuiz.questions[currentQuestionIndex].answer
                    ? "Correct! +15 XP"
                    : "Not quite!"}
                </span>
                <span>{selectedQuiz.questions[currentQuestionIndex].why}</span>
              </div>
            </div>
          )}

          {/* Controller buttons */}
          <div className="pt-4 border-t border-line flex justify-end">
            {!isSubmitted ? (
              <Button
                variant="primary"
                disabled={!selectedOption}
                onClick={handleSubmitAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5"
              >
                <span>
                  {currentQuestionIndex < selectedQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Completion Results Screen */}
      {selectedQuiz && quizFinished && (
        <div className="max-w-md mx-auto bg-surface border border-line-strong rounded-xl p-8 text-center space-y-6 shadow-sm select-none">
          <div className="w-16 h-16 bg-gold-soft border border-gold-ink rounded-full flex items-center justify-center mx-auto text-gold-ink">
            <Trophy className="w-8 h-8 text-gold" />
          </div>

          <div className="space-y-2">
            <h2 className="font-fraunces text-scale-h2 font-semibold text-ink">
              Quiz Completed!
            </h2>
            <p className="text-scale-small text-ink-3">
              You've completed the <strong>{selectedQuiz.title}</strong>.
            </p>
          </div>

          <div className="bg-surface-sink rounded-lg p-4 border border-line grid grid-cols-2 gap-4">
            <div className="text-center">
              <span className="text-[10px] text-ink-3 uppercase block font-bold">Score</span>
              <span className="font-fraunces text-2xl font-bold text-ink">
                {score} / {selectedQuiz.questions.length}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-ink-3 uppercase block font-bold">XP Gained</span>
              <span className="font-fraunces text-2xl font-bold text-gold-ink">
                +{score * 15} XP
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="w-1/2" onClick={() => startQuiz(selectedQuiz)}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake
            </Button>
            <Button variant="primary" className="w-1/2" onClick={resetQuiz}>
              Practice Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
