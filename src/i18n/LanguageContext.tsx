import { createContext, useContext, ReactNode } from "react";
import { translations, Lang, Translation } from "./translations";

const LanguageContext = createContext<{ lang: Lang; t: Translation }>({
  lang: "es",
  t: translations.es,
});

export const LanguageProvider = ({ lang, children }: { lang: Lang; children: ReactNode }) => (
  <LanguageContext.Provider value={{ lang, t: translations[lang] }}>
    {children}
  </LanguageContext.Provider>
);

export const useLang = () => useContext(LanguageContext);