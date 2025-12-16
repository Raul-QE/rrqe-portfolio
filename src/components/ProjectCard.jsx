// src/components/ProjectCard.jsx
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{
        y: -8,
        boxShadow: dark
          ? "0 0 25px rgba(37,99,235,0.25)"
          : "0 10px 30px rgba(0,0,0,0.08)",
      }}
      className="
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl
        p-5
        transition
      "
    >
      {/* IMAGE */}
      <div className="
        h-40
        rounded-lg
        overflow-hidden
        mb-4
        bg-gradient-to-br
        from-slate-100
        to-slate-200
        dark:from-[#020617]
        dark:to-[#020617]/60
        flex items-center justify-center
      ">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="text-[var(--text-secondary)] text-sm text-center px-2">
            {project.title}
          </div>
        )}
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-lg mb-2 text-[var(--text-primary)]">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3">
        {/* DEMO */}
        <a
          target="_blank"
          rel="noreferrer"
          href={project.demoUrl}
          className="
            px-3 py-1
            rounded-md
            text-sm
            text-white
            bg-[#2563eb]
            hover:bg-[#1d4ed8]
            shadow-[0_0_12px_rgba(37,99,235,0.45)]
            transition
            flex items-center justify-center
            min-w-[72px]
          "
        >
          Demo
        </a>

        {/* REPO */}
        <a
          target="_blank"
          rel="noreferrer"
          href={project.repoUrl}
          className="
            px-3 py-1
            rounded-md
            text-sm
            text-white
            bg-[#020617]
            border border-[#1e293b]
            hover:border-[#2563eb]
            shadow-[0_0_10px_rgba(30,41,59,0.6)]
            transition
            flex items-center justify-center
            min-w-[72px]
          "
        >
          Repo
        </a>
      </div>
    </motion.article>
  );
}