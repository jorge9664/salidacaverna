import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";

const episodes = [
  {
    number: "01",
    title: "¿La educación te prepara para vivir o para obedecer?",
    description:
      "Tres profesores y dos alumnos debaten sobre si el sistema educativo enseña a pensar o solo a aprobar. Sin tapujos.",
    duration: "34 min",
    tags: ["Educación", "Sistema"],
  },
  {
    number: "02",
    title: "Redes sociales: ¿espejo o cárcel?",
    description:
      "Una psicóloga y un creador de contenido hablan sobre identidad digital, validación constante y salud mental en la era del scroll infinito.",
    duration: "28 min",
    tags: ["Tecnología", "Salud mental"],
  },
  {
    number: "03",
    title: "¿Quién decide lo que es verdad?",
    description:
      "Periodistas y estudiantes discuten sobre desinformación, sesgos mediáticos y el precio de pensar diferente.",
    duration: "31 min",
    tags: ["Filosofía", "Medios"],
  },
];

const EpisodesSection = () => {
  return (
    <section id="episodes" className="py-24 cave-bg relative">
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
            Episodios
          </h2>
          <p className="text-muted-foreground text-lg">
            Tertulias completas que no vas a querer pausar.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {episodes.map((ep, index) => (
            <motion.a
              key={ep.number}
              href="https://www.youtube.com/@salidadelacaverna"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-xl p-6 hover-lift"
            >
              {/* Episode number + play */}
              <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-primary/10 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">EP</span>
                <span className="text-3xl font-bold text-foreground">{ep.number}</span>
                <Play className="w-4 h-4 text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {ep.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {ep.description}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-muted-foreground text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {ep.duration}
                  </span>
                  {ep.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-primary/80 font-medium uppercase tracking-wider bg-primary/5 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EpisodesSection;
