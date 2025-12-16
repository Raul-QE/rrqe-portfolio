// src/components/ProjectsInProgress.jsx
import { motion } from "framer-motion";
import AnimatedText from "./ui/AnimatedText";
import { useContext } from "react";
import { LangContext } from "../i18n/LangContext";
import ProgressText from "./ui/ProgressText";


const items = [
  {
    title: "Biblical Truth Platform",
    desc: "Theological explanations grounded in Scripture, presented through a modern React-based web experience.",
  },
  {
    title: "Creator Tools Suite",
    desc: "Private web platform with advanced audio and video tools for technical experimentation and personal use.",
  },
  {
    title: "Minecraft Plugins & Mods Hub",
    desc: "Visual repository of Java-based plugins and mods with documentation, version compatibility and performance focus.",
  },
];

export default function ProjectsInProgress() {
  const { texts } = useContext(LangContext);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((item, i) => (
        <motion.article
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -6 }}
          className="rounded-2xl p-5 border border-dashed 
          border-gray-300/40 dark:border-gray-600/40
          bg-gray-100/50 dark:bg-gray-800/40
          transition"
        >
          <div className="h-40 mb-4 rounded-lg flex items-center justify-center
          bg-gradient-to-br from-black/5 to-white/5">
            <ProgressText />
          </div>

          <h3 className="font-semibold text-lg mb-2">
            <AnimatedText text={item.title} />
          </h3>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {item.desc}
          </p>

          <span className="
            text-xs uppercase tracking-wider
            text-[var(--text-secondary)]
            opacity-60
            border border-[var(--border)]
            px-2 py-1 rounded-md
            inline-block
          ">
            Building carefully
          </span>
        </motion.article>
      ))}
    </motion.div>
  );
}