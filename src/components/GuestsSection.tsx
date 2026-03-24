import { motion } from "framer-motion";
import { Mic2, User } from "lucide-react";

const guests = [
  {
    name: "Elena Ríos",
    role: "Periodista de investigación",
    topic: "Libertad de prensa y desinformación",
    quote: "Informar no es contar lo que quieren oír, es contar lo que necesitan saber.",
  },
  {
    name: "David Moraleda",
    role: "Profesor de filosofía",
    topic: "Pensamiento crítico en las aulas",
    quote: "Enseñar a pensar es más peligroso que enseñar a obedecer.",
  },
  {
    name: "Lucía Navarro",
    role: "Psicóloga educativa",
    topic: "Salud mental y redes sociales",
    quote: "Estamos más conectados que nunca, pero más solos que nunca.",
  },
];

const GuestsSection = () => {
  return (
    <section id="guests" className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            Quienes se sientan a hablar
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Profesionales, docentes, periodistas y personas con algo real que contar.
            Cada invitado trae una perspectiva distinta a la mesa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {guests.map((guest, index) => (
            <motion.div
              key={guest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 hover-lift group relative overflow-hidden"
            >
              {/* Glow accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5">
                <User className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">{guest.name}</h3>
              <p className="text-primary text-sm font-semibold mb-1">{guest.role}</p>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">
                <Mic2 className="w-3 h-3 inline mr-1" />
                {guest.topic}
              </p>

              <blockquote className="text-muted-foreground italic text-sm border-l-2 border-primary/30 pl-4">
                "{guest.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestsSection;
