import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ParticipateSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <span className="text-4xl">🔥</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-6">
            ¿Te atreves a salir de la caverna?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Si eres alumno, profesor o simplemente alguien con algo que decir,
            queremos escucharte. Participa en el próximo episodio.
          </p>

          <Button variant="hero" size="lg" className="text-base px-10 py-6" asChild>
            <a href="mailto:contacto@lasalidadelacaverna.es">Quiero participar</a>
          </Button>
        </motion.div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default ParticipateSection;
