import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "Proyecto" },
  { href: "#social", label: "Redes" },
];

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const target = document.querySelector(href);
  target?.scrollIntoView({ behavior: "smooth" });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        scrolled || menuOpen ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-foreground font-bold text-lg tracking-tight">
          <span className="text-primary">La salida</span> de la caverna
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)} className="text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="https://www.youtube.com/@salidadelacaverna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            YouTube
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-foreground p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container px-4 py-4 flex flex-col gap-4 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => { handleSmoothScroll(e, link.href); setMenuOpen(false); }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.youtube.com/@salidadelacaverna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                YouTube
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
