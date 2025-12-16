// src/pages/Home.jsx
import { useContext, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { LangContext } from "../i18n/LangContext";
import DraggableAvatar from "../components/DraggableAvatar";
import AnimatedText from "../components/ui/AnimatedText";

export default function Home({ dark }) {
  const { texts } = useContext(LangContext);

  // Parallax al mover el mouse
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 90 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 90 });
  useTransform(springX, [-200, 200], [-20, 20]);
  useTransform(springY, [-200, 200], [-20, 20]);

  function handleMove(e) {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMove}
      className="
        section
        flex
        items-start
        hero
        min-h-[calc(100vh-5rem)]
        relative
        overflow-hidden
      "
    >
      <div className="
        max-w-6xl
        mx-auto
        px-4
        pt-20
        lg:flex
        lg:items-center
        lg:gap-12
      ">
        {/* Left: Text */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2"
        >
          {/* Role / subtitle */}
          <p className="text-sm mb-1 text-[var(--text-secondary)]">
            RRQE • <AnimatedText text={texts.hero.subtitle} className="relative top-[5px]"/>
          </p>

          {/* Titles */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3">
            <span
              className="
                relative
                transition-all duration-300

                /* LIGHT MODE */
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-[#1e293b]
                via-[#2563eb]
                to-[#1e293b]

                [text-shadow:-2px_-2px_0_rgba(0,0,0,1),2px_-2px_0_rgba(0,0,0,1),-2px_2px_0_rgba(0,0,0,1),2px_2px_0_rgba(0,0,0,1)]
                drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)]

                /* DARK MODE */
                dark:text-white
                dark:bg-none
                dark:[-webkit-text-fill-color:white]
                dark:[text-shadow:-2px_-2px_0_rgba(0,0,0,1),2px_-2px_0_rgba(0,0,0,1),-2px_2px_0_rgba(0,0,0,1),2px_2px_0_rgba(0,0,0,1)]
                dark:drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]
              "
            >
              <AnimatedText text={texts.hero.title} />
            </span>
          </h1>

          {/* Description */}
          <p className="
            mt-3
            text-lg
            max-w-xl
            leading-relaxed
            text-[var(--text-secondary)]
          ">
            <AnimatedText text={texts.hero.description} />
          </p>
        </motion.div>

        {/* Right: avatar + floating neon elements */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          {/* Fondo futurista */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--border)]/10 to-transparent blur-sm pointer-events-none"
          />

          {/* Avatar draggable */}
          <DraggableAvatar dark={dark} className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"/>

          {/* Floating neon circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.1, 0.25, 0.1], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 mix-blend-plus-lighter opacity-70 dark:opacity-100 filter blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0.08, 0.18, 0.08], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-16 top-28 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 mix-blend-plus-lighter opacity-70 dark:opacity-100 filter blur-2xl"
          />

          {/* SVG grid neon */}
          <motion.svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            viewBox="0 0 600 400"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="600" height="400" fill="url(#g1)">
              <animate attributeName="x" values="0;50;0" dur="6s" repeatCount="indefinite" />
            </rect>
          </motion.svg>
        </div>
      </div>
    </section>
  );
}