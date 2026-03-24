import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-foreground font-bold text-lg tracking-tight">
          <span className="text-primary">La salida</span> de la caverna
        </a>
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            Proyecto
          </a>
          <a
            href="#participate"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Participa
          </a>
          <a
            href="https://www.youtube.com/@salidadelacaverna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
