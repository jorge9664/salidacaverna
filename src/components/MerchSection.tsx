import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stripe_payment_link: string | null;
}

const MerchSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id,name,description,price,image_url,stripe_payment_link")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setProducts((data ?? []) as Product[]);
      setLoading(false);
    })();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section id="merch" className="py-24 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-3">
            Merch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Llévate la caverna
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Productos oficiales para apoyar al proyecto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover-lift"
            >
              <div className="aspect-square bg-muted overflow-hidden">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingBag className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <span className="text-primary font-bold whitespace-nowrap">
                    {Number(p.price).toFixed(2)} €
                  </span>
                </div>
                {p.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                )}
                {p.stripe_payment_link ? (
                  <Button variant="hero" className="w-full" asChild>
                    <a href={p.stripe_payment_link} target="_blank" rel="noopener noreferrer">
                      Comprar
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Próximamente
                  </Button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchSection;