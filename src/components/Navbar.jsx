// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { LangContext } from "../i18n/LangContext";
import { personal } from "../data/personal";
import LanguageToggle from "./LanguageToggle";
import DarkModeToggle from "./DarkModeToggle";

import AnimatedText from "./ui/AnimatedText";

export default function Navbar({ dark, setDark }) {
  const { texts } = useContext(LangContext);
  const [open, setOpen] = useState(false);

  const home = texts?.navbar?.home ?? "Home";
  const about = texts?.navbar?.about ?? "About";
  const projects = texts?.navbar?.projects ?? "Projects";
  const contact = texts?.navbar?.contact ?? "Contact";

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed w-full z-50"
    >
      <div className="backdrop-blur bg-black/30 dark:bg-black/60 border-b border-white/6">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-wide">RRQE</div>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#home"
              className="hover:text-blue-400 transition cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("home");
              }}
            >
              <AnimatedText text={home} />
            </a>

            <a
              href="#about"
              className="hover:text-blue-400 transition cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("about");
              }}
            >
              <AnimatedText text={about} />
            </a>

            <a
              href="#projects"
              className="hover:text-blue-400 transition cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("projects");
              }}
            >
              <AnimatedText text={projects} />
            </a>

            <a
              href="#contact"
              className="hover:text-blue-400 transition cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("contact");
              }}
            >
              <AnimatedText text={contact} />
            </a>

            <a
              href="/Curriculum2025.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-sm"
            >
              CV
            </a>

            <LanguageToggle />
            <DarkModeToggle dark={dark} setDark={setDark} />
          </nav>

          {/* NAV MOBILE */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button onClick={() => setOpen(!open)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {open && (
          <div className="md:hidden px-6 pb-6">
            <a
              className="block py-2 cursor-pointer"
              onClick={() => handleScroll("home")}
            >
              <AnimatedText text={home} />
            </a>
            <a
              className="block py-2 cursor-pointer"
              onClick={() => handleScroll("about")}
            >
              <AnimatedText text={about} />
            </a>
            <a
              className="block py-2 cursor-pointer"
              onClick={() => handleScroll("projects")}
            >
              <AnimatedText text={projects} />
            </a>
            <a
              className="block py-2 cursor-pointer"
              onClick={() => handleScroll("contact")}
            >
              <AnimatedText text={contact} />
            </a>
          </div>
        )}
      </div>
    </motion.header>
  );
}