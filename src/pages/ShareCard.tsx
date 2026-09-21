import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toPng } from "html-to-image";
import { ArrowLeft, Download, Share2, Copy, Check, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.png";

const STORAGE_KEY = "lsdlc:share-card";

type CardData = { question: string; answer: string };

const COPY: Record<string, Record<string, string>> = {
  es: {
    back: "Volver",
    title: "Comparte tu reflexión",
    subtitle: "Descarga la tarjeta o compártela directamente en tus redes.",
    download: "Descargar imagen",
    share: "Compartir",
    copy: "Copiar texto",
    copied: "Copiado",
    empty: "No hay ninguna reflexión para compartir todavía.",
    emptyCta: "Haz una pregunta",
    note: "Reflexión generada en La salida de la Caverna: una invitación a pensar.",
    label: "Pregunta",
  },
  en: {
    back: "Back",
    title: "Share your reflection",
    subtitle: "Download the card or share it straight to your social networks.",
    download: "Download image",
    share: "Share",
    copy: "Copy text",
    copied: "Copied",
    empty: "There is no reflection to share yet.",
    emptyCta: "Ask a question",
    note: "Reflection created at La salida de la Caverna: an invitation to think.",
    label: "Question",
  },
};

const decode = (value: string): CardData | null => {
  try {
    const json = decodeURIComponent(escape(window.atob(value.replace(/-/g, "+").replace(/_/g, "/"))));
    const parsed = JSON.parse(json);
    if (parsed?.question && parsed?.answer) return parsed as CardData;
  } catch {
    /* invalid payload */
  }
  return null;
};

export const encodeShare = (data: CardData) =>
  window
    .btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const ShareCard = () => {
  const { lang } = useLang();
  const copy = COPY[lang] ?? COPY.en;
  const [params] = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CardData | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const d = params.get("d");
    if (d) {
      const decoded = decode(d);
      if (decoded) {
        setData(decoded);
        return;
      }
    }
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as CardData);
    } catch {
      /* ignore */
    }
  }, [params]);

  const render = async () => {
    if (!cardRef.current) return null;
    return toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
  };

  const download = async () => {
    setBusy(true);
    try {
      const url = await render();
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.download = "salida-de-la-caverna.png";
      a.click();
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    if (!data) return;
    setBusy(true);
    try {
      const url = await render();
      const files: File[] = [];
      if (url) {
        const blob = await (await fetch(url)).blob();
        files.push(new File([blob], "salida-de-la-caverna.png", { type: "image/png" }));
      }
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (files.length && nav.canShare?.({ files }) && nav.share) {
        await nav.share({ files, title: data.question, text: copy.note });
        return;
      }
      if (nav.share) {
        await nav.share({ title: data.question, text: data.answer, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    } finally {
      setBusy(false);
    }
  };

  const copyText = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(`${data.question}\n\n${data.answer}\n\n${copy.note}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/#pregunta">
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold">{copy.title}</h1>
        <p className="mt-3 text-muted-foreground">{copy.subtitle}</p>

        {!data ? (
          <div className="mt-10 rounded-2xl border border-border bg-card/50 p-8 text-center">
            <p className="text-muted-foreground">{copy.empty}</p>
            <Button asChild className="mt-4">
              <Link to="/#pregunta">{copy.emptyCta}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div
              ref={cardRef}
              className="mt-10 overflow-hidden rounded-2xl border border-primary/20 bg-[hsl(var(--card))] p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <img src={logo} alt="" className="h-10 w-10 object-contain" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  La salida de la Caverna
                </span>
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {copy.label}
                </p>
                <p className="mt-2 text-xl md:text-2xl font-bold leading-snug text-foreground">
                  {data.question}
                </p>
              </div>

              <div className="mt-6 border-l-2 border-primary/60 pl-4">
                <Quote className="h-4 w-4 text-primary" />
                <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">
                  {data.answer}
                </p>
              </div>

              <p className="mt-8 text-xs text-muted-foreground">salidacaverna.es</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={download} disabled={busy}>
                <Download className="h-4 w-4" />
                {copy.download}
              </Button>
              <Button variant="secondary" onClick={share} disabled={busy}>
                <Share2 className="h-4 w-4" />
                {copy.share}
              </Button>
              <Button variant="ghost" onClick={copyText}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? copy.copied : copy.copy}
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{copy.note}</p>
          </>
        )}
      </div>
    </main>
  );
};

export default ShareCard;
