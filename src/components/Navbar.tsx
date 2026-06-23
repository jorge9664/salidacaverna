import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const useSmoothScroll = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToHash = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    const navbarOffset = 88;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: targetTop, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!location.hash || (location.pathname !== "/" && location.pathname !== "/en")) return;

    const timeout = window.setTimeout(() => scrollToHash(location.hash), 120);
    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== "/" && location.pathname !== "/en") {
      const prefix = location.pathname.startsWith("/en") ? "/en" : "/";
      navigate(`${prefix}${href}`);
      return;
    }
    scrollToHash(href);
  };

  return handleSmoothScroll;
};

const linkClass =
  "relative text-muted-foreground hover:text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-primary after:to-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left after:rounded-full";

const activeLinkClass =
  "relative text-foreground transition-colors after:content-[''] after:absolute after:w-full after:scale-x-100 after:h-1 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full";

const useActiveSection = (hrefs: string[]) => {
  const location = useLocation();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setActive(null);
    const isHome = location.pathname === "/" || location.pathname === "/en";
    if (!isHome) return;

    const hashes = hrefs.filter((h) => h.startsWith("#"));
    const elements = hashes
      .map((h) => document.querySelector(h) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const computeActive = () => {
      const probe = window.innerHeight * 0.35 + 88;
      let current: string | null = null;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe) current = `#${el.id}`;
      }
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 4) {
        current = `#${elements[elements.length - 1].id}`;
      }
      if (window.scrollY < 80) current = null;
      setActive(current);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, [hrefs.join("|"), location.pathname]);

  return active;
};

const Navbar = () => {
  const { t, lang } = useLang();
  const location = useLocation();
  const otherPath = lang === "es" ? "/en" : "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleSmoothScroll = useSmoothScroll();
  const activeHash = useActiveSection(t.nav.links.map((l) => l.href));

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      if (href === "/" || href === "/en") return false;
      return location.pathname === href || location.pathname.startsWith(`${href}/`);
    }
    return activeHash === href;
  };

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
        <Link to="/" className="text-foreground font-bold text-lg tracking-tight">
          <span className="text-primary">{t.nav.brandPrefix}</span>{t.nav.brandSuffix}
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          {t.nav.links.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.href} to={link.href} className={isActive(link.href) ? activeLinkClass : linkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)} className={isActive(link.href) ? activeLinkClass : linkClass}>
                {link.label}
              </a>
            )
          )}
          <a
            href="https://www.youtube.com/@salidadelacaverna"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-primary font-semibold hover:text-primary/80 transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-primary after:to-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left after:rounded-full"
          >
            {t.nav.youtube}
          </a>
          <Link
            to={otherPath}
            aria-label={t.nav.langSwitchAria}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors border border-border hover:border-primary/40 rounded-full px-3 py-1 text-xs font-semibold"
          >
            <Globe size={14} />
            {t.nav.langSwitch}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="sm:hidden flex items-center gap-3">
          <Link
            to={otherPath}
            aria-label={t.nav.langSwitchAria}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary border border-border rounded-full px-2.5 py-1 text-xs font-semibold"
          >
            <Globe size={12} />
            {t.nav.langSwitch}
          </Link>
          <button
            className="text-foreground p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
              {t.nav.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`transition-colors ${isActive(link.href) ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`transition-colors ${isActive(link.href) ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                    onClick={(e) => { handleSmoothScroll(e, link.href); setMenuOpen(false); }}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="https://www.youtube.com/@salidadelacaverna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.youtube}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
