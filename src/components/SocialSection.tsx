import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useSocialPlatforms } from "@/lib/socialPlatforms";

const SocialSection = () => {
  const { t } = useLang();
  const base = useSocialPlatforms();
  const platforms = base.map((p) => {
    const tr = t.social.platforms.find((x: any) => x.name === p.name) as any;
    return {
      ...p,
      description: tr?.description ?? t.social.platforms[0].description,
      cta: tr?.cta ?? t.social.platforms[0].cta,
    };
  });
  return (
    <section id="social" className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
            {t.social.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.social.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group block bg-card border border-border rounded-xl p-8 hover-lift relative overflow-hidden w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300 mb-5">
                {platform.renderIcon("w-8 h-8")}
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{platform.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{platform.description}</p>

              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                {platform.cta}
                <ExternalLink className="w-4 h-4" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
