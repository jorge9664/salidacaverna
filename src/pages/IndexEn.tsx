import { useEffect } from "react";
import Index from "./Index";
import { useLang } from "@/i18n/LanguageContext";

const IndexEn = () => {
  const { setLang } = useLang();
  useEffect(() => {
    setLang("en");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Index />;
};

export default IndexEn;