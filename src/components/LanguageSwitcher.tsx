import { Globe, Check } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LangOption = {
  code: Lang;
  label: string;
  flag: string;
};

const LANGUAGES: LangOption[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

type Props = { compact?: boolean };

const LanguageSwitcher = ({ compact = false }: Props) => {
  const { lang, setLang } = useLang();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

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
      <DropdownMenuContent align="end" className="min-w-[180px] max-h-[70vh] overflow-y-auto">
        {LANGUAGES.map((opt) => {
          const isCurrent = opt.code === current.code;
          return (
            <DropdownMenuItem
              key={opt.code}
              onClick={() => setLang(opt.code)}
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