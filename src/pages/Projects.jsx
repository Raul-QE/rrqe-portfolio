// src/pages/Projects.jsx
import { useContext } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectsInProgress from '../components/ProjectsInProgress'
import AnimatedText from '../components/ui/AnimatedText'
import projects from '../data/projects'
import { motion } from 'framer-motion'
import { LangContext } from '../i18n/LangContext'

export default function Projects() {
  const { texts } = useContext(LangContext)

  const hasRealProjects = projects.length > 0

  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-[var(--text-primary)]"
        >
          <AnimatedText text={texts.projects.title} />
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 max-w-xl text-[var(--text-secondary)]"
        >
          <AnimatedText text={texts.projects.inProgressSubtitle} />
        </motion.p>

        {/* CONTENT */}
        {hasRealProjects ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.div>
        ) : (
          <ProjectsInProgress />
        )}

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center text-sm text-[var(--text-secondary)] opacity-70"
        >
          <AnimatedText text={texts.projects.footer} />
        </motion.p>

      </div>
    </section>
  )
}