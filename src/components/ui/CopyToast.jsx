import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CopyToast({ x, y, visible, text }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.18 }}
      className="
        fixed z-50 px-3 py-1 rounded-xl text-sm shadow-lg 
        backdrop-blur-md border 
        bg-white/80 text-gray-900 border-gray-300
        dark:bg-neutral-900/80 dark:text-white dark:border-neutral-700
      "
      style={{
        top: y + 10,
        left: x + 10,
        pointerEvents: "none",
      }}
    >
      {text}
    </motion.div>
  );
}