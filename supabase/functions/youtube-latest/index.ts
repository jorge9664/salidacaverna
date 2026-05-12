import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const CHANNEL_ID = "UCWxPg1duOjHWHU99vLHO8AA";
const FILTER = "| Salida de la Caverna";

interface YTItem {
  id: { videoId?: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; medium?: { url: string } };
  };
}

let cache: { at: number; data: unknown } | null = null;
const TTL_MS = 10 * 60 * 1000; // 10 minutes

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (cache && Date.now() - cache.at < TTL_MS) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("YOUTUBE_API_KEY");
    if (!apiKey) throw new Error("YOUTUBE_API_KEY is not configured");

    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("key", apiKey);
    url.searchParams.set("channelId", CHANNEL_ID);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("order", "date");
    url.searchParams.set("type", "video");
    url.searchParams.set("maxResults", "25");

    const res = await fetch(url.toString());
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`YouTube API ${res.status}: ${body}`);
    }
    const json = await res.json() as { items: YTItem[] };

    const videos = json.items
      .filter((it) => it.id.videoId && it.snippet.title.includes(FILTER))
      .map((it) => {
        const title = it.snippet.title;
        const match = title.match(/#(\d+)/);
        return {
          id: it.id.videoId!,
          title,
          episode: match ? `#${match[1]}` : "",
          publishedAt: it.snippet.publishedAt,
          thumbnail:
            it.snippet.thumbnails.high?.url ||
            it.snippet.thumbnails.medium?.url ||
            `https://i.ytimg.com/vi/${it.id.videoId}/hqdefault.jpg`,
        };
      });

    const payload = { videos };
    cache = { at: Date.now(), data: payload };

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("youtube-latest error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message, videos: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});