import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
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

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("articles")
        .select("id, slug, title, excerpt, content, cover_image, author, published_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!data) {
        setNotFound(true);
      } else {
        setArticle(data as Article);
        document.title = `${data.title} | La salida de la caverna`;
        if (data.excerpt) {
          let meta = document.querySelector('meta[name="description"]');
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", data.excerpt.slice(0, 160));
        }
      }
      setLoading(false);
    })();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container px-4 max-w-3xl">
          <Link
            to="/articulos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Todos los artículos
          </Link>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : notFound || !article ? (
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-2">Artículo no encontrado</h1>
              <p className="text-muted-foreground">El artículo que buscas no existe o no está publicado.</p>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                {formatDate(article.published_at)}
                {article.author ? ` · ${article.author}` : ""}
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {article.cover_image && (
                <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border my-10">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-invert prose-lg max-w-none mt-8 whitespace-pre-wrap leading-relaxed text-foreground/90">
                {article.content}
              </div>
            </motion.article>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ArticleDetail;