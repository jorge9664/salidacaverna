import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { ArrowLeft, Download, FileDown, Images, Share2, Copy, Check, Quote, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import logo from "@/assets/logo.png";
import {
  type CardData,
  type FavoriteCard,
  SHARE_STORAGE_KEY,
  addFavorite,
  decodeShare,
  encodeShare,
  isFavorite,
  loadFavorites,
  removeFavorite,
  saveFavorites,
} from "@/lib/share";

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
    save: "Guardar tarjeta",
    saved: "Guardada",
    favTitle: "Tus tarjetas guardadas",
    favNote:
      "Solo en esta sesión y en tu dispositivo: al cerrar la pestaña se borran. Toca una tarjeta para volver a verla.",
    clear: "Borrar todas",
    remove: "Quitar",
    downloadAllImages: "Descargar todas (imágenes)",
    downloadPdf: "Descargar PDF",
    exporting: "Preparando…",
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
    save: "Save card",
    saved: "Saved",
    favTitle: "Your saved cards",
    favNote:
      "Session-only and on your device: they are cleared when you close the tab. Tap a card to view it again.",
    clear: "Clear all",
    remove: "Remove",
    downloadAllImages: "Download all (images)",
    downloadPdf: "Download PDF",
    exporting: "Preparing…",
  },
};

const ShareCard = () => {
  const { lang } = useLang();
  const copy = COPY[lang] ?? COPY.en;
  const [params] = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CardData | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteCard[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    const d = params.get("d");
    if (d) {
      const decoded = decodeShare(d);
      if (decoded) {
        setData(decoded);
        setSaved(isFavorite(decoded));
        return;
      }
    }
    try {
      const raw = window.sessionStorage.getItem(SHARE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CardData;
        setData(parsed);
        setSaved(isFavorite(parsed));
      }
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

  const toggleSave = () => {
    if (!data) return;
    if (saved) {
      const existing = loadFavorites().find((f) => f.question === data.question);
      if (existing) setFavorites(removeFavorite(existing.id));
      setSaved(false);
    } else {
      setFavorites(addFavorite(data));
      setSaved(true);
    }
  };

  const openFavorite = (fav: FavoriteCard) => {
    const next = { question: fav.question, answer: fav.answer };
    setData(next);
    setSaved(true);
    try {
      window.sessionStorage.setItem(SHARE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFavorites = () => {
    saveFavorites([]);
    setFavorites([]);
    setSaved(false);
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
              <Button variant={saved ? "default" : "outline"} onClick={toggleSave}>
                <Star className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                {saved ? copy.saved : copy.save}
              </Button>
              <Button variant="ghost" onClick={copyText}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? copy.copied : copy.copy}
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{copy.note}</p>
          </>
        )}

        {favorites.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <Star className="h-4 w-4" />
                {copy.favTitle}
              </h2>
              <Button variant="ghost" size="sm" onClick={clearFavorites}>
                <Trash2 className="h-4 w-4" />
                {copy.clear}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{copy.favNote}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {favorites.map((fav) => (
                <li
                  key={fav.id}
                  className="rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/60"
                >
                  <button
                    type="button"
                    onClick={() => openFavorite(fav)}
                    className="w-full text-left"
                  >
                    <span className="block text-sm font-medium text-foreground/90 line-clamp-2">
                      {fav.question}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground line-clamp-2">
                      {fav.answer}
                    </span>
                  </button>
                  <div className="mt-3 flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/tarjeta?d=${encodeShare({ question: fav.question, answer: fav.answer })}`}>
                        <Share2 className="h-3.5 w-3.5" />
                        {copy.share}
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFavorites(removeFavorite(fav.id));
                        if (data?.question === fav.question) setSaved(false);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {copy.remove}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default ShareCard;
