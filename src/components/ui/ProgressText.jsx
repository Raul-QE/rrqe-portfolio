// src/components/ui/ProgressText.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const steps = ["In progress", "In progress.", "In progress..", "In progress..."];

export default function ProgressText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 900);

    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-flex items-center justify-center
      w-[7.5rem] h-5"
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={steps[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="absolute whitespace-nowrap text-xs uppercase tracking-wider
          text-[var(--text-secondary)] opacity-70"
        >
          {steps[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}