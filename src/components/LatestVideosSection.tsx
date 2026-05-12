import { motion } from "framer-motion";
import { Play, Youtube, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Video = {
  id: string;
  title: string;
  episode: string;
  publishedAt: string;
  thumbnail: string;
};

const fallbackVideos: Video[] = [
  {
    id: "Azeme64Y0aM",
    title: "La identidad de género | Salida de la Caverna #2",
    episode: "#2",
    publishedAt: "2026-05-11T09:00:06Z",
    thumbnail: "https://i.ytimg.com/vi/Azeme64Y0aM/hqdefault.jpg",
  },
  {
    id: "bjjNbE4WxWE",
    title: "El bien: ¿objetivo o subjetivo? | Salida de la Caverna #1",
    episode: "#1",
    publishedAt: "2026-05-03T20:00:06Z",
    thumbnail: "https://i.ytimg.com/vi/bjjNbE4WxWE/hqdefault.jpg",
  },
  {
    id: "gRJ6qM9MNoU",
    title: "Seguridad, privacidad y control | Salida de la Caverna #0",
    episode: "#0",
    publishedAt: "2026-04-26T20:00:06Z",
    thumbnail: "https://i.ytimg.com/vi/gRJ6qM9MNoU/hqdefault.jpg",
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const LatestVideosSection = () => {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("youtube-latest");
        if (!cancelled && !error && data?.videos?.length) {
          setVideos(data.videos as Video[]);
        }
      } catch (e) {
        console.error("Failed to load latest videos:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="videos" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 light-beam opacity-20 pointer-events-none" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              <Youtube className="w-4 h-4" />
              Últimos vídeos
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gradient">
              Lo nuevo en el canal
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@salidadelacaverna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold text-sm hover:gap-2 inline-flex items-center gap-1 transition-all"
          >
            Ver todo en YouTube →
          </a>
        </motion.div>

        {loading && (
          <div className="flex justify-center mb-6 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.a
              key={video.title}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group block"
            >
              <div className="relative aspect-video bg-secondary rounded-xl overflow-hidden mb-3 border border-border group-hover:border-primary/40 transition-all duration-300">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 glow-orange">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Episode badge */}
                {video.episode && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                    Episodio {video.episode}
                  </span>
                )}
              </div>

              <h3 className="text-foreground font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="text-muted-foreground text-xs">{formatDate(video.publishedAt)}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideosSection;