"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuestionPage from "@/components/QuestionPage";
import FinalPage from "@/components/FinalPage";
import RandomSurprisePopup from "@/components/RandomSurprisePopup";

const QUESTIONS = [
  "Aapko main kaisa laga?",
  "Main kya karu ki aap mujhse pyar karne lago?",
  "Aapko mere andar sabse bura kya lagta hai?",
  "Kya aap mujhse pyar karti ho?",
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < 5) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <main className="w-full h-screen overflow-hidden bg-pink-50 font-sans">
      <RandomSurprisePopup />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {currentPage <= 4 ? (
            <QuestionPage
              question={QUESTIONS[currentPage - 1]}
              pageIndex={currentPage}
              onNext={handleNext}
            />
          ) : (
            <FinalPage />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
