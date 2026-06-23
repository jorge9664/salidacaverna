import { Globe, Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LangOption = {
  code: string;
  label: string;
  flag: string;
  /** "es" → "/", "en" → "/en", others → Google Translate target code */
  kind: "native" | "translate";
  translateCode?: string;
};

const LANGUAGES: LangOption[] = [
  { code: "es", label: "Español", flag: "🇪🇸", kind: "native" },
  { code: "en", label: "English", flag: "🇬🇧", kind: "native" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", kind: "translate", translateCode: "de" },
  { code: "fr", label: "Français", flag: "🇫🇷", kind: "translate", translateCode: "fr" },
  { code: "it", label: "Italiano", flag: "🇮🇹", kind: "translate", translateCode: "it" },
  { code: "pt", label: "Português", flag: "🇵🇹", kind: "translate", translateCode: "pt" },
  { code: "ru", label: "Русский", flag: "🇷🇺", kind: "translate", translateCode: "ru" },
  { code: "uk", label: "Українська", flag: "🇺🇦", kind: "translate", translateCode: "uk" },
  { code: "sv", label: "Svenska", flag: "🇸🇪", kind: "translate", translateCode: "sv" },
  { code: "zh", label: "中文", flag: "🇨🇳", kind: "translate", translateCode: "zh-CN" },
];

type Props = {
  compact?: boolean;
};

const LanguageSwitcher = ({ compact = false }: Props) => {
  const { lang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  const handleSelect = (opt: LangOption) => {
    if (opt.kind === "native") {
      const restPath = location.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
      const target = opt.code === "en" ? `/en${restPath === "/" ? "" : restPath}` : restPath;
      if (target !== location.pathname) navigate(target);
      return;
    }
    // Use Google Translate as a transparent proxy for non-native languages.
    const fullUrl = window.location.origin + location.pathname + location.search + location.hash;
    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=${opt.translateCode}&u=${encodeURIComponent(fullUrl)}`;
    window.open(translateUrl, "_blank", "noopener,noreferrer");
  };

  const triggerClass = compact
    ? "inline-flex items-center gap-1 text-muted-foreground hover:text-primary border border-border rounded-full px-2.5 py-1 text-xs font-semibold"
    : "inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors border border-border hover:border-primary/40 rounded-full px-3 py-1 text-xs font-semibold";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Select language"
        className={triggerClass}
      >
        <Globe size={compact ? 12 : 14} />
        <span aria-hidden>{current.flag}</span>
        <span className="uppercase">{current.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {LANGUAGES.map((opt) => {
          const isCurrent = opt.code === current.code;
          return (
            <DropdownMenuItem
              key={opt.code}
              onClick={() => handleSelect(opt)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span aria-hidden className="text-base leading-none">{opt.flag}</span>
              <span className="flex-1">{opt.label}</span>
              {isCurrent && <Check size={14} className="text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;