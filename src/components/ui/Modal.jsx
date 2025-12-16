import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { LangContext } from "../../i18n/LangContext"; // AJUSTA LA RUTA REAL

export default function Modal({ open, text, onClose }) {
  const { texts } = useContext(LangContext);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 w-80 text-center border border-gray-200 dark:border-neutral-700"
          >
            <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">
              {text}
            </p>

            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {texts.contact.modal.accept}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}