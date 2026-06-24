import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Lang, Translation } from "./translations";

const STORAGE_KEY = "lsdlc:lang";
const SUPPORTED: Lang[] = ["es", "en", "de", "fr", "it", "pt", "ru", "uk", "sv", "zh"];

const isLang = (v: unknown): v is Lang =>
  typeof v === "string" && (SUPPORTED as string[]).includes(v);

const detectInitial = (fallback: Lang): Lang => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* ignore */
  }
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  const base = nav.split("-")[0];
  if (isLang(base)) return base as Lang;
  return fallback;
};

type Ctx = {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx>({
  lang: "es",
  t: translations.es,
  setLang: () => {},
});

export const LanguageProvider = ({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) => {
  const [lang, setLangState] = useState<Lang>(() => detectInitial(initialLang ?? "es"));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = translations[lang].htmlLang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    if ((SUPPORTED as string[]).includes(l)) setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as Translation, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);