import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/data/categories";
import { Check, X } from "lucide-react";

interface QuizBlockProps {
  quiz: QuizQuestion;
}

const QuizBlock = ({ quiz }: QuizBlockProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };

  const isCorrect = selected === quiz.correctIndex;

  const reset = () => {
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="space-y-4">
      {/* Code Snippet */}
      <div className="rounded-lg bg-code p-4 overflow-x-auto">
        <pre className="text-sm text-code-foreground font-mono leading-relaxed">
          {quiz.code}
        </pre>
      </div>

      {/* Question */}
      <p className="font-semibold text-foreground">{quiz.question}</p>

      {/* Options */}
      <div className="grid gap-2">
        {quiz.options.map((option, i) => {
          let optionClasses =
            "px-4 py-3 rounded-lg border text-sm font-medium text-left transition-all cursor-pointer ";

          if (!answered) {
            optionClasses += "border-border bg-card hover:border-primary/40 hover:glow-primary text-foreground";
          } else if (i === quiz.correctIndex) {
            optionClasses += "border-success bg-success/10 text-foreground glow-success";
          } else if (i === selected) {
            optionClasses += "border-destructive bg-destructive/10 text-foreground glow-error";
          } else {
            optionClasses += "border-border bg-card text-muted-foreground opacity-50";
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              className={optionClasses}
              animate={
                answered && i === selected
                  ? isCorrect
                    ? { scale: [1, 1.03, 1] }
                    : { x: [0, -4, 4, -4, 4, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0">
                  {answered && i === quiz.correctIndex ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : answered && i === selected ? (
                    <X className="w-3.5 h-3.5" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={`rounded-lg p-4 text-sm leading-relaxed ${
                isCorrect
                  ? "bg-success/10 border border-success/20 text-foreground"
                  : "bg-destructive/10 border border-destructive/20 text-foreground"
              }`}
            >
              <p className="font-semibold mb-1">
                {isCorrect ? "✅ Correct!" : "❌ Not quite!"}
              </p>
              <p className="text-muted-foreground">{quiz.explanation}</p>
            </div>
            <button
              onClick={reset}
              className="mt-3 text-sm text-primary hover:underline font-medium"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizBlock;
