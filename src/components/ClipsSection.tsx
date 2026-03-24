import { motion } from "framer-motion";
import { Play, Flame } from "lucide-react";

const clips = [
  {
    title: "\"Nos enseñan a memorizar, no a pensar\"",
    tag: "Educación",
    duration: "0:58",
  },
  {
    title: "\"Las redes no te conectan, te comparan\"",
    tag: "Redes sociales",
    duration: "1:12",
  },
  {
    title: "\"Un profesor me cambió la vida con una pregunta\"",
    tag: "Inspiración",
    duration: "0:47",
  },
  {
    title: "\"La libertad empieza donde acaba el miedo\"",
    tag: "Filosofía",
    duration: "1:05",
  },
  {
    title: "\"Nadie te enseña a gestionar tus emociones\"",
    tag: "Salud mental",
    duration: "0:52",
  },
  {
    title: "\"El sistema quiere trabajadores, no pensadores\"",
    tag: "Sociedad",
    duration: "1:18",
  },
];

const ClipsSection = () => {
  return (
    <section id="clips" className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <Flame className="w-4 h-4" />
            Clips para redes
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            Momentos que dan que pensar
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fragmentos de menos de dos minutos que dicen más que muchos discursos.
            Hechos para compartir, pensados para quedarse.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clips.map((clip, index) => (
            <motion.a
              key={clip.title}
              href="https://www.youtube.com/@salidadelacaverna"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group block"
            >
              <div className="relative aspect-[9/16] sm:aspect-video bg-secondary rounded-xl overflow-hidden mb-3 border border-border hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs font-mono px-2 py-0.5 rounded">
                  {clip.duration}
                </span>
                <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {clip.tag}
                </span>
              </div>
              <h3 className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors leading-snug">
                {clip.title}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClipsSection;
