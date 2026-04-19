import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// 👉 Pega aquí la URL del Apps Script desplegado como Web App
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6VKm4Wux7NGK-lPL_X7ItaNvyjej3nm5QNF36bODdKB9WnpxOmLYKUjr3i_T3W03E/exec";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Email no válido").max(255, "Máximo 255 caracteres"),
  subject: z.string().trim().min(1, "El asunto es obligatorio").max(150, "Máximo 150 caracteres"),
  message: z.string().trim().min(1, "El mensaje es obligatorio").max(1000, "Máximo 1000 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const COOLDOWN_MS = 30_000; // 30s entre envíos
const MIN_FILL_TIME_MS = 3_000; // bots rellenan en <3s

const ContactSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAtRef = useRef<number>(Date.now());
  const lastSubmitRef = useRef<number>(0);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // 1. Honeypot: campo oculto que solo los bots rellenan
    if (honeypotRef.current?.value) {
      toast({ title: "¡Mensaje enviado!", description: "Gracias por escribirnos." });
      reset();
      return;
    }

    // 2. Tiempo mínimo de relleno
    if (Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS) {
      toast({
        title: "Espera un momento",
        description: "Tómate unos segundos para revisar el formulario.",
        variant: "destructive",
      });
      return;
    }

    // 3. Cooldown entre envíos
    const sinceLast = Date.now() - lastSubmitRef.current;
    if (lastSubmitRef.current && sinceLast < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - sinceLast) / 1000);
      toast({
        title: "Demasiados envíos",
        description: `Espera ${wait}s antes de enviar otro mensaje.`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Apps Script acepta text/plain sin preflight CORS
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(values),
      });

      lastSubmitRef.current = Date.now();
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por escribirnos. Te responderemos pronto.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Inténtalo de nuevo en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
              Contacto
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              ¿Tienes una idea, propuesta o quieres participar? Escríbenos.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8"
          >
            {/* Honeypot anti-spam: oculto para humanos, visible para bots */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tu nombre" {...register("name")} />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" {...register("email")} />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input id="subject" placeholder="¿Sobre qué nos escribes?" {...register("subject")} />
              {errors.subject && (
                <p className="text-destructive text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos..."
                rows={5}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-destructive text-sm">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full text-base"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar mensaje"
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default ContactSection;
