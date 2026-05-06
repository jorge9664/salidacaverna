import { motion } from "framer-motion";
import { Play, Eye, Clock, Youtube } from "lucide-react";

const videos = [
  {
    title: "¿La educación te prepara para vivir o para obedecer?",
    duration: "34:12",
    views: "12K",
    tag: "Episodio",
    gradient: "from-primary/40 via-primary/10 to-background",
  },
  {
    title: "Redes sociales: ¿espejo o cárcel?",
    duration: "28:45",
    views: "9.4K",
    tag: "Episodio",
    gradient: "from-accent/40 via-accent/10 to-background",
  },
  {
    title: "\"Nos enseñan a memorizar, no a pensar\"",
    duration: "0:58",
    views: "45K",
    tag: "Clip",
    gradient: "from-primary/50 via-background to-background",
  },
  {
    title: "¿Quién decide lo que es verdad?",
    duration: "31:08",
    views: "7.8K",
    tag: "Episodio",
    gradient: "from-primary/30 via-accent/10 to-background",
  },
  {
    title: "\"La libertad empieza donde acaba el miedo\"",
    duration: "1:05",
    views: "32K",
    tag: "Clip",
    gradient: "from-accent/40 via-primary/10 to-background",
  },
  {
    title: "\"El sistema quiere trabajadores, no pensadores\"",
    duration: "1:18",
    views: "58K",
    tag: "Clip",
    gradient: "from-primary/60 via-primary/20 to-background",
  },
  {
    title: "\"Un profesor me cambió la vida con una pregunta\"",
    duration: "0:47",
    views: "21K",
    tag: "Clip",
    gradient: "from-accent/30 via-background to-background",
  },
  {
    title: "\"Las redes no te conectan, te comparan\"",
    duration: "1:12",
    views: "38K",
    tag: "Clip",
    gradient: "from-primary/40 via-accent/10 to-background",
  },
];

const LatestVideosSection = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.a
              key={video.title}
              href="https://www.youtube.com/@salidadelacaverna"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group block"
            >
              <div className="relative aspect-video bg-secondary rounded-xl overflow-hidden mb-3 border border-border group-hover:border-primary/40 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.3),transparent_60%)]" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 glow-orange">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Tag */}
                <span className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  {video.tag}
                </span>

                {/* Duration */}
                <span className="absolute bottom-2 right-2 bg-background/90 text-foreground text-xs font-mono px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>

              <h3 className="text-foreground font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-3 text-muted-foreground text-xs">
                <span className="inline-flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {video.views}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Reciente
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideosSection;