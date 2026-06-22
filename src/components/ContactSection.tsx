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
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const COOLDOWN_MS = 30_000; // 30s entre envíos
const MIN_FILL_TIME_MS = 3_000; // bots rellenan en <3s

const ContactSection = () => {
  const { t } = useLang();
  const contactSchema = z.object({
    name: z.string().trim().min(1, t.contact.errors.nameReq).max(100, t.contact.errors.nameMax),
    email: z.string().trim().email(t.contact.errors.emailInvalid).max(255, t.contact.errors.emailMax),
    subject: z.string().trim().min(1, t.contact.errors.subjectReq).max(150, t.contact.errors.subjectMax),
    message: z.string().trim().min(1, t.contact.errors.messageReq).max(1000, t.contact.errors.messageMax),
  });
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
      toast({ title: t.contact.toast.sentTitle, description: t.contact.toast.sentDesc });
      reset();
      return;
    }

    // 2. Tiempo mínimo de relleno
    if (Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS) {
      toast({
        title: t.contact.toast.waitTitle,
        description: t.contact.toast.waitDesc,
        variant: "destructive",
      });
      return;
    }

    // 3. Cooldown entre envíos
    const sinceLast = Date.now() - lastSubmitRef.current;
    if (lastSubmitRef.current && sinceLast < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - sinceLast) / 1000);
      toast({
        title: t.contact.toast.cooldownTitle,
        description: t.contact.toast.cooldownDesc(wait),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Guarda el mensaje directamente en el panel de admin
      await supabase.from("contact_messages").insert({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });

      lastSubmitRef.current = Date.now();
      toast({
        title: t.contact.toast.sentTitle,
        description: t.contact.toast.sentDesc,
      });
      reset();
    } catch (error) {
      toast({
        title: t.contact.toast.errorTitle,
        description: t.contact.toast.errorDesc,
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
              {t.contact.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.contact.subtitle}
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
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input id="name" placeholder={t.contact.namePh} {...register("name")} />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input id="email" type="email" placeholder={t.contact.emailPh} {...register("email")} />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{t.contact.subject}</Label>
              <Input id="subject" placeholder={t.contact.subjectPh} {...register("subject")} />
              {errors.subject && (
                <p className="text-destructive text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                placeholder={t.contact.messagePh}
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
                  {t.contact.sending}
                </>
              ) : (
                t.contact.send
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
