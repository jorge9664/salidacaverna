import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Send, History, Trash2, GraduationCap, Unlock, Lightbulb, Share2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SHARE_STORAGE_KEY,
  addFavorite,
  encodeShare,
  isFavorite,
  loadFavorites,
  removeFavorite,
} from "@/lib/share";

type Copy = {
  tag: string;
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  thinking: string;
  error: string;
  disclaimer: string;
  historyTitle: string;
  historyNote: string;
  clear: string;
  suggestionsTitle: string;
  share: string;
  save: string;
  saved: string;
  favTitle: string;
  favNote: string;
  openCard: string;
};

type SuggestionGroup = {
  label: string;
  icon: "education" | "freedom" | "critical";
  questions: string[];
};

type HistoryEntry = { id: string; question: string; answer: string; at: number };

const HISTORY_KEY = "lsdlc:ask-history";
const HISTORY_MAX = 8;

const loadHistory = (): HistoryEntry[] => {
  try {
    const raw = window.sessionStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
};

const saveHistory = (entries: HistoryEntry[]) => {
  try {
    window.sessionStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    /* sessionStorage unavailable */
  }
};

const COPY: Record<string, Copy> = {
  es: {
    tag: "Pregunta y reflexiona",
    title: "Pregunta sobre los vídeos",
    subtitle:
      "Escribe tu duda sobre cualquier tema o episodio y recibirás una reflexión basada en el proyecto.",
    placeholder: "¿El bien es objetivo o depende de cada cultura?",
    send: "Enviar pregunta",
    thinking: "Pensando…",
    error: "No se pudo generar la respuesta. Inténtalo de nuevo en unos instantes.",
    disclaimer: "Respuesta generada automáticamente: una invitación a pensar, no una verdad cerrada.",
    historyTitle: "Tus preguntas recientes",
    historyNote:
      "Anónimo y solo en esta sesión: al cerrar la pestaña se borra. Toca una pregunta para retomar la reflexión.",
    clear: "Borrar historial",
    suggestionsTitle: "¿Por dónde empezar?",
    share: "Compartir tarjeta",
    save: "Guardar en favoritas",
    saved: "Guardada",
    favTitle: "Tus tarjetas favoritas",
    favNote:
      "Guardadas solo en esta sesión y en tu dispositivo. Ábrelas para volver a verlas o compartirlas.",
    openCard: "Ver tarjeta",
  },
  en: {
    tag: "Ask and reflect",
    title: "Ask about the videos",
    subtitle:
      "Write your question about any topic or episode and get a reflection based on the project.",
    placeholder: "Is goodness objective or does it depend on each culture?",
    send: "Send question",
    thinking: "Thinking…",
    error: "The answer could not be generated. Please try again in a moment.",
    disclaimer: "Automatically generated answer: an invitation to think, not a closed truth.",
    historyTitle: "Your recent questions",
    historyNote:
      "Anonymous and session-only: it is cleared when you close the tab. Tap a question to continue the reflection.",
    clear: "Clear history",
    suggestionsTitle: "Where to start?",
    share: "Share card",
    save: "Save to favourites",
    saved: "Saved",
    favTitle: "Your favourite cards",
    favNote:
      "Saved only in this session and on your device. Open them to view or share them again.",
    openCard: "View card",
  },
};

const SUGGESTIONS: Record<string, SuggestionGroup[]> = {
  es: [
    {
      label: "Educación",
      icon: "education",
      questions: [
        "¿Educar es enseñar a pensar o enseñar a obedecer?",
        "¿Qué aprender hoy que la escuela no me enseña?",
      ],
    },
    {
      label: "Libertad",
      icon: "freedom",
      questions: [
        "¿Somos realmente libres o solo elegimos dentro de lo que nos muestran?",
        "¿Puede haber libertad sin responsabilidad?",
      ],
    },
    {
      label: "Pensamiento crítico",
      icon: "critical",
      questions: [
        "¿Cómo sé si una opinión es mía o me la han vendido?",
        "¿Dudar de todo nos acerca a la verdad o nos paraliza?",
      ],
    },
  ],
  en: [
    {
      label: "Education",
      icon: "education",
      questions: [
        "Is education about teaching us to think, or to obey?",
        "What should we learn today that school never teaches?",
      ],
    },
    {
      label: "Freedom",
      icon: "freedom",
      questions: [
        "Are we truly free, or do we only choose among what we are shown?",
        "Can there be freedom without responsibility?",
      ],
    },
    {
      label: "Critical thinking",
      icon: "critical",
      questions: [
        "How do I know if an opinion is really mine or was sold to me?",
        "Does doubting everything bring us closer to truth, or paralyze us?",
      ],
    },
  ],
};

const SUGGESTION_ICONS = {
  education: GraduationCap,
  freedom: Unlock,
  critical: Lightbulb,
};

const AskSection = () => {
  const { lang } = useLang();
  const copy = COPY[lang] ?? COPY.en;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const useSuggestion = (q: string) => {
    setQuestion(q);
    setError(false);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const openEntry = (entry: HistoryEntry) => {
    setQuestion(entry.question);
    setAnswer(entry.answer);
    setError(false);
  };

  const ask = async () => {
    if (question.trim().length < 5 || loading) return;
    setLoading(true);
    setError(false);
    setAnswer("");

    try {
      let titles: string[] = [];
      try {
        const { data } = await supabase.functions.invoke("youtube-latest");
        const videos = (data as { videos?: { title: string }[] } | null)?.videos ?? [];
        titles = videos.map((v) => v.title);
      } catch {
        /* context is optional */
      }

      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ask-caverna`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ question: question.trim(), lang, videos: titles }),
      });

      if (!res.ok || !res.body) throw new Error("request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setAnswer(acc);
      }
      if (!acc.trim()) {
        setError(true);
      } else {
        const entry: HistoryEntry = {
          id: `${Date.now()}`,
          question: question.trim(),
          answer: acc,
          at: Date.now(),
        };
        setHistory((prev) => {
          const next = [entry, ...prev.filter((h) => h.question !== entry.question)].slice(
            0,
            HISTORY_MAX,
          );
          saveHistory(next);
          return next;
        });
      }
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pregunta" className="py-24 bg-background">
      <div className="container px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" />
            {copy.tag}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">{copy.title}</h2>
          <p className="mt-3 text-muted-foreground">{copy.subtitle}</p>
        </motion.div>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-5 md:p-7 shadow-lg">
          <Textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={copy.placeholder}
            maxLength={1000}
            rows={3}
            className="resize-none bg-background/60"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask();
            }}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={ask} disabled={loading || question.trim().length < 5}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {copy.thinking}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {copy.send}
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {copy.suggestionsTitle}
            </p>
            <div className="mt-3 space-y-2">
              {(SUGGESTIONS[lang] ?? SUGGESTIONS.en).map((group) => {
                const Icon = SUGGESTION_ICONS[group.icon];
                return (
                  <div key={group.label} className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                      <Icon className="h-3.5 w-3.5" />
                      {group.label}
                    </span>
                    {group.questions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => useSuggestion(q)}
                        disabled={loading}
                        className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/60 hover:text-foreground disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>


          {(answer || error) && (
            <div className="mt-6 border-t border-border pt-6">
              {error && !answer ? (
                <p className="text-destructive text-sm">{copy.error}</p>
              ) : (
                <>
                  <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                    {answer}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">{copy.disclaimer}</p>
                </>
              )}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <History className="h-4 w-4" />
                {copy.historyTitle}
              </h3>
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <Trash2 className="h-4 w-4" />
                {copy.clear}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{copy.historyNote}</p>
            <ul className="mt-4 space-y-2">
              {history.map((entry) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => openEntry(entry)}
                    className="w-full rounded-xl border border-border bg-card/40 px-4 py-3 text-left transition-colors hover:border-primary/60 hover:bg-card/70"
                  >
                    <span className="block text-sm font-medium text-foreground/90 line-clamp-2">
                      {entry.question}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground line-clamp-1">
                      {entry.answer}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AskSection;
