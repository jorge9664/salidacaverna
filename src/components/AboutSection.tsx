import { motion } from "framer-motion";
import { Eye, MessageCircleQuestion, Lightbulb } from "lucide-react";

const features = [
  {
    icon: MessageCircleQuestion,
    title: "Preguntas sin filtro",
    description: "Educación, libertad, verdad, sociedad… Los temas que importan, sin edulcorar.",
  },
  {
    icon: Eye,
    title: "Respuestas reales",
    description: "Profesores, alumnos e invitados responden desde su experiencia. Sin guion, sin trampa.",
  },
  {
    icon: Lightbulb,
    title: "Pensamiento crítico",
    description: "Inspirado en el mito de la caverna de Platón: cuestionar lo que damos por hecho.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 cave-bg relative">
      <div className="absolute inset-0 light-beam opacity-50" />
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            ¿Qué es La salida de la caverna?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un proyecto audiovisual grabado en un instituto donde nadie se esconde.
            Preguntas incómodas, respuestas sinceras, conversaciones que importan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card border border-border rounded-lg p-8 hover-lift group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
