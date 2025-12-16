import { createContext } from "react";

export const LangContext = createContext({
  lang: "es",
  setLang: () => {},
  texts: {},
  isGlitching: false,
  setIsGlitching: () => {},
});