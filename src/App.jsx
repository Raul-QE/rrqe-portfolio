// src/App.jsx
import { useEffect, useState } from "react";
import { LangContext } from "./i18n/LangContext";
import es from "./i18n/es";
import en from "./i18n/en";

import Background from "./components/Background";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "es");

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const texts = lang === "es" ? es : en;

  const changeLang = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
  <LangContext.Provider value={{ lang, setLang: changeLang, texts }}>
    <div
      className={`
        ${dark ? "dark" : ""}
        bg-[var(--bg)]
        text-[var(--text-primary)]
        transition-colors duration-300
      `}
    >
      {/* Fondo animado */}
      <Background dark={dark} />

      {/* Contenido */}
      <div className="relative min-h-screen transition-colors duration-300">
        <Navbar dark={dark} setDark={setDark} />
        <main className="pt-20">
          <Home dark={dark} />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  </LangContext.Provider>
);

}