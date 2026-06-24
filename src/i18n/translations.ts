export type Lang =
  | "es"
  | "en"
  | "de"
  | "fr"
  | "it"
  | "pt"
  | "ru"
  | "uk"
  | "sv"
  | "zh";

export const translations = {
  es: {
    htmlLang: "es",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Proyecto" },
        { href: "#social", label: "Redes" },
        { href: "/articulos", label: "Artículos" },
        { href: "#contact", label: "Contacto" },
      ],
      youtube: "Episodios",
      langSwitch: "EN",
      langSwitchAria: "Switch to English",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "Lo que nadie",
      titleLine2: "te cuenta",
      subtitle:
        "Conversaciones reales con profesionales, periodistas y profesores. Sin guion. Sin filtro. Grabado en un instituto.",
      ctaPrimary: "Ver episodios",
      ctaSecondary: "Descubre el proyecto",
      heroAlt: "Caverna con luz — metáfora del pensamiento crítico",
    },
    about: {
      title: "¿Qué es La salida de la caverna?",
      intro:
        "Un programa de tertulia donde personas reales hablan de lo que realmente importa. Nada de discursos vacíos ni debates forzados: aquí se viene a pensar en voz alta, a discrepar con respeto y a decir lo que muchos piensan pero pocos dicen.",
      quote:
        "Salir de la caverna no es encontrar respuestas, es atreverse a hacer las preguntas.",
      features: [
        {
          title: "Conversaciones sin guion",
          description:
            "Invitamos a profesionales, periodistas y profesores a sentarse frente a la cámara. Sin preguntas pactadas, sin respuestas ensayadas.",
        },
        {
          title: "Temas que importan",
          description:
            "Educación, libertad, verdad, redes sociales, salud mental… Los temas que afectan a tu día a día, tratados con honestidad.",
        },
        {
          title: "Desde un instituto",
          description:
            "Grabado en un centro educativo real. Un espacio donde las ideas se cruzan con la realidad de quienes las viven cada día.",
        },
      ],
    },
    videos: {
      badge: "Últimos vídeos",
      title: "Lo nuevo en el canal",
      seeAll: "Ver todo en YouTube →",
      episodeLabel: "Episodio",
      dateLocale: "es-ES",
    },
    social: {
      title: "Encuéntranos en redes",
      subtitle:
        "Cada plataforma, un formato distinto. La misma esencia: conversaciones que importan.",
      platforms: [
        { name: "Spotify", description: "Escúchanos en formato podcast", cta: "Escuchar" },
        { name: "iVoox", description: "Episodios completos en audio", cta: "Escuchar" },
        { name: "YouTube", description: "Tertulias completas y episodios íntegros", cta: "Suscríbete" },
        { name: "TikTok", description: "Clips cortos que dan que pensar", cta: "Síguenos" },
        { name: "Instagram", description: "Detrás de cámaras y novedades", cta: "Síguenos" },
      ],
    },
    contact: {
      title: "Contacto",
      subtitle: "¿Tienes una idea, propuesta o quieres participar? Escríbenos.",
      name: "Nombre",
      namePh: "Tu nombre",
      email: "Email",
      emailPh: "tu@email.com",
      subject: "Asunto",
      subjectPh: "¿Sobre qué nos escribes?",
      message: "Mensaje",
      messagePh: "Cuéntanos...",
      send: "Enviar mensaje",
      sending: "Enviando...",
      errors: {
        nameReq: "El nombre es obligatorio",
        nameMax: "Máximo 100 caracteres",
        emailInvalid: "Email no válido",
        emailMax: "Máximo 255 caracteres",
        subjectReq: "El asunto es obligatorio",
        subjectMax: "Máximo 150 caracteres",
        messageReq: "El mensaje es obligatorio",
        messageMax: "Máximo 1000 caracteres",
      },
      toast: {
        sentTitle: "¡Mensaje enviado!",
        sentDesc: "Gracias por escribirnos. Te responderemos pronto.",
        waitTitle: "Espera un momento",
        waitDesc: "Tómate unos segundos para revisar el formulario.",
        cooldownTitle: "Demasiados envíos",
        cooldownDesc: (s: number) => `Espera ${s}s antes de enviar otro mensaje.`,
        errorTitle: "Error al enviar",
        errorDesc: "Inténtalo de nuevo en unos minutos.",
      },
    },
    footer: {
      tagline: "Síguenos para no perderte ninguna conversación.",
      brand: "La salida de la caverna",
      brandSub: "Conversaciones reales desde el aula.",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    htmlLang: "en",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Project" },
        { href: "#social", label: "Social" },
        { href: "/articulos", label: "Articles" },
        { href: "#contact", label: "Contact" },
      ],
      youtube: "Episodes",
      langSwitch: "ES",
      langSwitchAria: "Cambiar a español",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "What no one",
      titleLine2: "tells you",
      subtitle:
        "Real conversations with professionals, journalists and teachers. No script. No filter. Recorded at a high school.",
      ctaPrimary: "Watch episodes",
      ctaSecondary: "Discover the project",
      heroAlt: "Cave with light — a metaphor for critical thinking",
    },
    about: {
      title: "What is La salida de la caverna?",
      intro:
        "A talk show where real people discuss what truly matters. No empty speeches, no forced debates: this is a place to think out loud, disagree respectfully, and say what many think but few dare to say.",
      quote:
        "Leaving the cave isn't about finding answers — it's about daring to ask the questions.",
      features: [
        {
          title: "Unscripted conversations",
          description:
            "We invite professionals, journalists and teachers to sit in front of the camera. No agreed questions, no rehearsed answers.",
        },
        {
          title: "Topics that matter",
          description:
            "Education, freedom, truth, social media, mental health… The topics that shape your daily life, treated with honesty.",
        },
        {
          title: "From inside a school",
          description:
            "Recorded in a real educational space. A place where ideas meet the reality of those who live them every day.",
        },
      ],
    },
    videos: {
      badge: "Latest videos",
      title: "New on the channel",
      seeAll: "See all on YouTube →",
      episodeLabel: "Episode",
      dateLocale: "en-US",
    },
    social: {
      title: "Find us on social",
      subtitle:
        "Each platform, a different format. The same essence: conversations that matter.",
      platforms: [
        { name: "Spotify", description: "Listen to us as a podcast", cta: "Listen" },
        { name: "iVoox", description: "Full episodes in audio", cta: "Listen" },
        { name: "YouTube", description: "Full talks and complete episodes", cta: "Subscribe" },
        { name: "TikTok", description: "Short clips that make you think", cta: "Follow us" },
        { name: "Instagram", description: "Behind the scenes and updates", cta: "Follow us" },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Got an idea, a proposal or want to take part? Write to us.",
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@email.com",
      subject: "Subject",
      subjectPh: "What is it about?",
      message: "Message",
      messagePh: "Tell us...",
      send: "Send message",
      sending: "Sending...",
      errors: {
        nameReq: "Name is required",
        nameMax: "Max 100 characters",
        emailInvalid: "Invalid email",
        emailMax: "Max 255 characters",
        subjectReq: "Subject is required",
        subjectMax: "Max 150 characters",
        messageReq: "Message is required",
        messageMax: "Max 1000 characters",
      },
      toast: {
        sentTitle: "Message sent!",
        sentDesc: "Thanks for reaching out. We'll get back to you soon.",
        waitTitle: "Hold on a moment",
        waitDesc: "Take a few seconds to review the form.",
        cooldownTitle: "Too many submissions",
        cooldownDesc: (s: number) => `Wait ${s}s before sending another message.`,
        errorTitle: "Failed to send",
        errorDesc: "Please try again in a few minutes.",
      },
    },
    footer: {
      tagline: "Follow us so you don't miss a single conversation.",
      brand: "La salida de la caverna",
      brandSub: "Real conversations from the classroom.",
      rights: "All rights reserved.",
    },
  },
};

export type Translation = typeof translations.es;