import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  { title: "¿Qué es la verdad?", tag: "Filosofía", duration: "2:14" },
  { title: "¿La educación te hace libre?", tag: "Educación", duration: "1:58" },
  { title: "¿Vivimos en una burbuja?", tag: "Sociedad", duration: "2:31" },
  { title: "¿Pensamos o repetimos?", tag: "Pensamiento crítico", duration: "1:45" },
  { title: "¿Qué cambiarías del instituto?",  tag: "Educación", duration: "2:08" },
  { title: "¿Las redes nos conectan o nos aíslan?", tag: "Tecnología", duration: "2:22" },
];

const VideosSection = () => {
  return (
    <section id="videos" className="py-24 cave-bg relative">
      <div className="absolute inset-0 light-beam opacity-30" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            Últimos vídeos
          </h2>
          <p className="text-muted-foreground text-lg">
            Preguntas que no encontrarás en un examen.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.a
              key={video.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group block"
            >
              <div className="relative aspect-video bg-secondary rounded-xl overflow-hidden mb-3 border border-border hover-lift">
                {/* Placeholder thumbnail with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                  </div>
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs font-mono px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <span className="text-xs text-primary/80 font-medium uppercase tracking-wider">
                {video.tag}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
