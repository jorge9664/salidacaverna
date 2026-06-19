import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";

interface ArticleSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  published_at: string | null;
}

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

const Articles = () => {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Artículos | La salida de la caverna";
    const desc = "Reflexiones, ensayos y notas filosóficas del proyecto La salida de la caverna.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    (async () => {
      const { data } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, cover_image, author, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      setArticles((data ?? []) as ArticleSummary[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Artículos</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Reflexiones, ensayos y notas que salen de la caverna.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Todavía no hay artículos publicados. Vuelve pronto.
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {articles.map((a, i) => (
                <motion.article
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group"
                >
                  <Link to={`/articulos/${a.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-card border border-border mb-4">
                      {a.cover_image ? (
                        <img
                          src={a.cover_image}
                          alt={a.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10" />
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {formatDate(a.published_at)}
                      {a.author ? ` · ${a.author}` : ""}
                    </p>
                    <h2 className="text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                      {a.title}
                    </h2>
                    {a.excerpt && (
                      <p className="text-muted-foreground mt-2 line-clamp-2">{a.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-1 mt-3 text-sm text-primary">
                      Leer artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Articles;