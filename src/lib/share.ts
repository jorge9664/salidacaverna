export type CardData = { question: string; answer: string };

export type FavoriteCard = CardData & { id: string; at: number };

export const SHARE_STORAGE_KEY = "lsdlc:share-card";
export const FAVORITES_KEY = "lsdlc:share-favorites";
const FAVORITES_MAX = 12;

export const encodeShare = (data: CardData) =>
  window
    .btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

export const decodeShare = (value: string): CardData | null => {
  try {
    const json = decodeURIComponent(
      escape(window.atob(value.replace(/-/g, "+").replace(/_/g, "/"))),
    );
    const parsed = JSON.parse(json);
    if (parsed?.question && parsed?.answer) return parsed as CardData;
  } catch {
    /* invalid payload */
  }
  return null;
};

export const loadFavorites = (): FavoriteCard[] => {
  try {
    const raw = window.sessionStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as FavoriteCard[]) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (items: FavoriteCard[]) => {
  try {
    window.sessionStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch {
    /* sessionStorage unavailable */
  }
};

export const addFavorite = (data: CardData): FavoriteCard[] => {
  const next = [
    { ...data, id: `${Date.now()}`, at: Date.now() },
    ...loadFavorites().filter((f) => f.question !== data.question),
  ].slice(0, FAVORITES_MAX);
  saveFavorites(next);
  return next;
};

export const removeFavorite = (id: string): FavoriteCard[] => {
  const next = loadFavorites().filter((f) => f.id !== id);
  saveFavorites(next);
  return next;
};

export const isFavorite = (data: CardData | null) =>
  !!data && loadFavorites().some((f) => f.question === data.question);
