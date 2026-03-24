import { motion } from "framer-motion";
import { Zap, Clock, Smartphone } from "lucide-react";

const FormatSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-6">
              Formato ping-pong
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Preguntas rápidas, respuestas directas. Sin rodeos, sin postureo.
              Un formato dinámico pensado para redes sociales y para ti.
            </p>

            <div className="space-y-6">
              {[
                { icon: Zap, label: "Preguntas rápidas tipo ping-pong" },
                { icon: Clock, label: "Vídeos cortos y dinámicos" },
                { icon: Smartphone, label: "Pensados para redes sociales" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground text-lg">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
              {[
                { q: "¿Qué es la libertad para ti?", side: "left" },
                { q: "Hacer lo que quiero sin dañar a nadie.", side: "right" },
                { q: "¿Y si lo que quieres daña al planeta?", side: "left" },
                { q: "Entonces toca repensar qué es querer.", side: "right" },
              ].map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.side === "left"
                      ? "bg-primary/15 text-foreground rounded-bl-none"
                      : "bg-secondary text-secondary-foreground rounded-br-none ml-auto"
                  }`}
                >
                  {msg.q}
                </motion.div>
              ))}
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
