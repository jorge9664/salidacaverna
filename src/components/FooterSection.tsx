import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useLang } from "@/i18n/LanguageContext";
import { useSocialPlatforms } from "@/lib/socialPlatforms";

const FooterSection = () => {
  const { t } = useLang();
  const socials = useSocialPlatforms();
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg text-center max-w-md"
          >
            {t.footer.tagline}
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                {social.renderIcon("w-6 h-6")}
              </a>
            ))}
          </motion.div>

          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <img src={logo} alt="La salida de la caverna" className="w-16 h-16 object-contain mb-3" />
            <p className="text-foreground font-bold text-lg">{t.footer.brand}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {t.footer.brandSub}
            </p>
          </div>

          <p className="text-muted-foreground/50 text-xs">
            © {new Date().getFullYear()} {t.footer.brand}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
