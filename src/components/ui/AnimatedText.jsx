import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedText({ text, className }) {
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={text}
          initial={{
            opacity: 0,
            y: -14,        // nuevo entra desde ARRIBA
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,          // posición final
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -14,        // viejo sube al mismo tiempo
            filter: "blur(6px)",
          }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1], // Apple smooth
          }}
          style={{
            position: "relative",
            display: "inline",
            whiteSpace: "normal",
          }}
        >
          {text}
        </motion.span>
      </AnimatePresence>

      {/* Mantiene el tamaño estable */}
      <span style={{ height: 0, overflow: "hidden", display: "block" }}>{text}</span>
    </span>
  );
}