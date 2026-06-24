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
  de: {
    htmlLang: "de",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Projekt" },
        { href: "#social", label: "Soziale Netzwerke" },
        { href: "/articulos", label: "Artikel" },
        { href: "#contact", label: "Kontakt" },
      ],
      youtube: "Episoden",
      langSwitch: "DE",
      langSwitchAria: "Sprache wählen",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "Was dir niemand",
      titleLine2: "erzählt",
      subtitle:
        "Echte Gespräche mit Fachleuten, Journalisten und Lehrern. Ohne Drehbuch. Ohne Filter. Aufgenommen in einer Schule.",
      ctaPrimary: "Episoden ansehen",
      ctaSecondary: "Projekt entdecken",
      heroAlt: "Höhle mit Licht – Metapher für kritisches Denken",
    },
    about: {
      title: "Was ist La salida de la caverna?",
      intro:
        "Eine Talkshow, in der echte Menschen über das sprechen, was wirklich zählt. Keine leeren Reden, keine erzwungenen Debatten: hier wird laut nachgedacht, respektvoll widersprochen und gesagt, was viele denken, aber wenige aussprechen.",
      quote:
        "Die Höhle zu verlassen heißt nicht, Antworten zu finden, sondern es zu wagen, die Fragen zu stellen.",
      features: [
        {
          title: "Gespräche ohne Drehbuch",
          description:
            "Wir laden Fachleute, Journalisten und Lehrer vor die Kamera ein. Keine abgesprochenen Fragen, keine einstudierten Antworten.",
        },
        {
          title: "Themen, die zählen",
          description:
            "Bildung, Freiheit, Wahrheit, soziale Medien, psychische Gesundheit … Themen, die deinen Alltag prägen – ehrlich behandelt.",
        },
        {
          title: "Aus einer Schule",
          description:
            "Aufgenommen an einem echten Bildungsort. Ein Raum, an dem Ideen auf die Realität derer treffen, die sie jeden Tag leben.",
        },
      ],
    },
    videos: {
      badge: "Neueste Videos",
      title: "Neu auf dem Kanal",
      seeAll: "Alle auf YouTube ansehen →",
      episodeLabel: "Episode",
      dateLocale: "de-DE",
    },
    social: {
      title: "Folge uns in den sozialen Netzwerken",
      subtitle:
        "Jede Plattform, ein anderes Format. Dieselbe Essenz: Gespräche, die zählen.",
      platforms: [
        { name: "Spotify", description: "Hör uns als Podcast", cta: "Anhören" },
        { name: "iVoox", description: "Vollständige Episoden als Audio", cta: "Anhören" },
        { name: "YouTube", description: "Vollständige Gespräche und ganze Episoden", cta: "Abonnieren" },
        { name: "TikTok", description: "Kurze Clips zum Nachdenken", cta: "Folgen" },
        { name: "Instagram", description: "Hinter den Kulissen und Neuigkeiten", cta: "Folgen" },
      ],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Hast du eine Idee, einen Vorschlag oder möchtest du mitmachen? Schreib uns.",
      name: "Name",
      namePh: "Dein Name",
      email: "E-Mail",
      emailPh: "du@email.com",
      subject: "Betreff",
      subjectPh: "Worum geht es?",
      message: "Nachricht",
      messagePh: "Erzähl uns ...",
      send: "Nachricht senden",
      sending: "Wird gesendet ...",
      errors: {
        nameReq: "Name ist erforderlich",
        nameMax: "Maximal 100 Zeichen",
        emailInvalid: "Ungültige E-Mail",
        emailMax: "Maximal 255 Zeichen",
        subjectReq: "Betreff ist erforderlich",
        subjectMax: "Maximal 150 Zeichen",
        messageReq: "Nachricht ist erforderlich",
        messageMax: "Maximal 1000 Zeichen",
      },
      toast: {
        sentTitle: "Nachricht gesendet!",
        sentDesc: "Danke für deine Nachricht. Wir melden uns bald.",
        waitTitle: "Einen Moment",
        waitDesc: "Nimm dir kurz Zeit, das Formular zu prüfen.",
        cooldownTitle: "Zu viele Einsendungen",
        cooldownDesc: (s: number) => `Warte ${s}s, bevor du eine weitere Nachricht sendest.`,
        errorTitle: "Senden fehlgeschlagen",
        errorDesc: "Bitte versuche es in wenigen Minuten erneut.",
      },
    },
    footer: {
      tagline: "Folge uns, damit du kein Gespräch verpasst.",
      brand: "La salida de la caverna",
      brandSub: "Echte Gespräche aus dem Klassenzimmer.",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  fr: {
    htmlLang: "fr",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Projet" },
        { href: "#social", label: "Réseaux" },
        { href: "/articulos", label: "Articles" },
        { href: "#contact", label: "Contact" },
      ],
      youtube: "Épisodes",
      langSwitch: "FR",
      langSwitchAria: "Choisir la langue",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "Ce que personne",
      titleLine2: "ne te dit",
      subtitle:
        "Des conversations réelles avec des professionnels, des journalistes et des enseignants. Sans script. Sans filtre. Enregistré dans un lycée.",
      ctaPrimary: "Voir les épisodes",
      ctaSecondary: "Découvrir le projet",
      heroAlt: "Grotte avec lumière — métaphore de la pensée critique",
    },
    about: {
      title: "Qu'est-ce que La salida de la caverna ?",
      intro:
        "Une émission où des personnes réelles parlent de ce qui compte vraiment. Pas de discours creux ni de débats forcés : on vient ici pour penser à voix haute, être en désaccord avec respect et dire ce que beaucoup pensent mais que peu osent dire.",
      quote:
        "Sortir de la caverne, ce n'est pas trouver des réponses, c'est oser poser les questions.",
      features: [
        {
          title: "Conversations sans script",
          description:
            "Nous invitons des professionnels, journalistes et enseignants devant la caméra. Aucune question convenue, aucune réponse répétée.",
        },
        {
          title: "Des sujets qui comptent",
          description:
            "Éducation, liberté, vérité, réseaux sociaux, santé mentale… Les sujets de votre quotidien, traités avec honnêteté.",
        },
        {
          title: "Depuis un lycée",
          description:
            "Enregistré dans un véritable établissement éducatif. Un lieu où les idées rencontrent la réalité de celles et ceux qui les vivent chaque jour.",
        },
      ],
    },
    videos: {
      badge: "Dernières vidéos",
      title: "Nouveautés de la chaîne",
      seeAll: "Tout voir sur YouTube →",
      episodeLabel: "Épisode",
      dateLocale: "fr-FR",
    },
    social: {
      title: "Retrouvez-nous sur les réseaux",
      subtitle: "Chaque plateforme, un format différent. La même essence : des conversations qui comptent.",
      platforms: [
        { name: "Spotify", description: "Écoutez-nous en podcast", cta: "Écouter" },
        { name: "iVoox", description: "Épisodes complets en audio", cta: "Écouter" },
        { name: "YouTube", description: "Discussions et épisodes complets", cta: "S'abonner" },
        { name: "TikTok", description: "Des clips courts qui font réfléchir", cta: "Suivre" },
        { name: "Instagram", description: "Coulisses et actualités", cta: "Suivre" },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Une idée, une proposition ou envie de participer ? Écris-nous.",
      name: "Nom",
      namePh: "Ton nom",
      email: "Email",
      emailPh: "toi@email.com",
      subject: "Objet",
      subjectPh: "De quoi s'agit-il ?",
      message: "Message",
      messagePh: "Raconte-nous...",
      send: "Envoyer le message",
      sending: "Envoi...",
      errors: {
        nameReq: "Le nom est obligatoire",
        nameMax: "100 caractères max",
        emailInvalid: "Email invalide",
        emailMax: "255 caractères max",
        subjectReq: "L'objet est obligatoire",
        subjectMax: "150 caractères max",
        messageReq: "Le message est obligatoire",
        messageMax: "1000 caractères max",
      },
      toast: {
        sentTitle: "Message envoyé !",
        sentDesc: "Merci de nous avoir écrit. Nous répondrons bientôt.",
        waitTitle: "Un instant",
        waitDesc: "Prends quelques secondes pour vérifier le formulaire.",
        cooldownTitle: "Trop d'envois",
        cooldownDesc: (s: number) => `Attends ${s}s avant d'envoyer un autre message.`,
        errorTitle: "Échec de l'envoi",
        errorDesc: "Réessaie dans quelques minutes.",
      },
    },
    footer: {
      tagline: "Suis-nous pour ne manquer aucune conversation.",
      brand: "La salida de la caverna",
      brandSub: "Conversations réelles depuis la salle de classe.",
      rights: "Tous droits réservés.",
    },
  },
  it: {
    htmlLang: "it",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Progetto" },
        { href: "#social", label: "Social" },
        { href: "/articulos", label: "Articoli" },
        { href: "#contact", label: "Contatti" },
      ],
      youtube: "Episodi",
      langSwitch: "IT",
      langSwitchAria: "Scegli la lingua",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "Ciò che nessuno",
      titleLine2: "ti racconta",
      subtitle:
        "Conversazioni reali con professionisti, giornalisti e insegnanti. Senza copione. Senza filtri. Registrato in un liceo.",
      ctaPrimary: "Guarda gli episodi",
      ctaSecondary: "Scopri il progetto",
      heroAlt: "Caverna con luce — metafora del pensiero critico",
    },
    about: {
      title: "Che cos'è La salida de la caverna?",
      intro:
        "Un talk show dove persone vere parlano di ciò che conta davvero. Niente discorsi vuoti né dibattiti forzati: qui si viene a pensare ad alta voce, dissentire con rispetto e dire ciò che molti pensano ma pochi dicono.",
      quote:
        "Uscire dalla caverna non è trovare risposte, è avere il coraggio di porre le domande.",
      features: [
        {
          title: "Conversazioni senza copione",
          description:
            "Invitiamo professionisti, giornalisti e insegnanti davanti alla telecamera. Nessuna domanda concordata, nessuna risposta provata.",
        },
        {
          title: "Temi che contano",
          description:
            "Istruzione, libertà, verità, social media, salute mentale… I temi che toccano la tua vita, trattati con onestà.",
        },
        {
          title: "Da un liceo",
          description:
            "Registrato in una vera scuola. Uno spazio dove le idee incontrano la realtà di chi le vive ogni giorno.",
        },
      ],
    },
    videos: {
      badge: "Ultimi video",
      title: "Nuovo sul canale",
      seeAll: "Vedi tutto su YouTube →",
      episodeLabel: "Episodio",
      dateLocale: "it-IT",
    },
    social: {
      title: "Trovaci sui social",
      subtitle: "Ogni piattaforma, un formato diverso. La stessa essenza: conversazioni che contano.",
      platforms: [
        { name: "Spotify", description: "Ascoltaci come podcast", cta: "Ascolta" },
        { name: "iVoox", description: "Episodi completi in audio", cta: "Ascolta" },
        { name: "YouTube", description: "Tertulie ed episodi integrali", cta: "Iscriviti" },
        { name: "TikTok", description: "Clip brevi che fanno pensare", cta: "Seguici" },
        { name: "Instagram", description: "Dietro le quinte e novità", cta: "Seguici" },
      ],
    },
    contact: {
      title: "Contatti",
      subtitle: "Hai un'idea, una proposta o vuoi partecipare? Scrivici.",
      name: "Nome",
      namePh: "Il tuo nome",
      email: "Email",
      emailPh: "tu@email.com",
      subject: "Oggetto",
      subjectPh: "Di cosa si tratta?",
      message: "Messaggio",
      messagePh: "Raccontaci...",
      send: "Invia messaggio",
      sending: "Invio...",
      errors: {
        nameReq: "Il nome è obbligatorio",
        nameMax: "Massimo 100 caratteri",
        emailInvalid: "Email non valida",
        emailMax: "Massimo 255 caratteri",
        subjectReq: "L'oggetto è obbligatorio",
        subjectMax: "Massimo 150 caratteri",
        messageReq: "Il messaggio è obbligatorio",
        messageMax: "Massimo 1000 caratteri",
      },
      toast: {
        sentTitle: "Messaggio inviato!",
        sentDesc: "Grazie per averci scritto. Ti risponderemo presto.",
        waitTitle: "Un attimo",
        waitDesc: "Prenditi qualche secondo per controllare il modulo.",
        cooldownTitle: "Troppi invii",
        cooldownDesc: (s: number) => `Aspetta ${s}s prima di inviare un altro messaggio.`,
        errorTitle: "Invio non riuscito",
        errorDesc: "Riprova tra qualche minuto.",
      },
    },
    footer: {
      tagline: "Seguici per non perderti nessuna conversazione.",
      brand: "La salida de la caverna",
      brandSub: "Conversazioni reali dall'aula.",
      rights: "Tutti i diritti riservati.",
    },
  },
  pt: {
    htmlLang: "pt",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Projeto" },
        { href: "#social", label: "Redes" },
        { href: "/articulos", label: "Artigos" },
        { href: "#contact", label: "Contacto" },
      ],
      youtube: "Episódios",
      langSwitch: "PT",
      langSwitchAria: "Escolher idioma",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "O que ninguém",
      titleLine2: "te conta",
      subtitle:
        "Conversas reais com profissionais, jornalistas e professores. Sem guião. Sem filtro. Gravado numa escola.",
      ctaPrimary: "Ver episódios",
      ctaSecondary: "Descobre o projeto",
      heroAlt: "Caverna com luz — metáfora do pensamento crítico",
    },
    about: {
      title: "O que é La salida de la caverna?",
      intro:
        "Um programa de tertúlia onde pessoas reais falam do que realmente importa. Nada de discursos vazios nem debates forçados: aqui vem-se para pensar em voz alta, discordar com respeito e dizer o que muitos pensam mas poucos dizem.",
      quote:
        "Sair da caverna não é encontrar respostas, é atrever-se a fazer as perguntas.",
      features: [
        {
          title: "Conversas sem guião",
          description:
            "Convidamos profissionais, jornalistas e professores para a câmara. Sem perguntas combinadas, sem respostas ensaiadas.",
        },
        {
          title: "Temas que importam",
          description:
            "Educação, liberdade, verdade, redes sociais, saúde mental… Os temas que afetam o teu dia a dia, tratados com honestidade.",
        },
        {
          title: "Desde uma escola",
          description:
            "Gravado num centro educativo real. Um espaço onde as ideias se cruzam com a realidade de quem as vive.",
        },
      ],
    },
    videos: {
      badge: "Últimos vídeos",
      title: "Novidades no canal",
      seeAll: "Ver tudo no YouTube →",
      episodeLabel: "Episódio",
      dateLocale: "pt-PT",
    },
    social: {
      title: "Encontra-nos nas redes",
      subtitle: "Cada plataforma, um formato distinto. A mesma essência: conversas que importam.",
      platforms: [
        { name: "Spotify", description: "Ouve-nos em formato podcast", cta: "Ouvir" },
        { name: "iVoox", description: "Episódios completos em áudio", cta: "Ouvir" },
        { name: "YouTube", description: "Tertúlias e episódios completos", cta: "Subscreve" },
        { name: "TikTok", description: "Clips curtos que fazem pensar", cta: "Segue-nos" },
        { name: "Instagram", description: "Bastidores e novidades", cta: "Segue-nos" },
      ],
    },
    contact: {
      title: "Contacto",
      subtitle: "Tens uma ideia, proposta ou queres participar? Escreve-nos.",
      name: "Nome",
      namePh: "O teu nome",
      email: "Email",
      emailPh: "tu@email.com",
      subject: "Assunto",
      subjectPh: "Sobre o quê?",
      message: "Mensagem",
      messagePh: "Conta-nos...",
      send: "Enviar mensagem",
      sending: "A enviar...",
      errors: {
        nameReq: "O nome é obrigatório",
        nameMax: "Máximo 100 caracteres",
        emailInvalid: "Email inválido",
        emailMax: "Máximo 255 caracteres",
        subjectReq: "O assunto é obrigatório",
        subjectMax: "Máximo 150 caracteres",
        messageReq: "A mensagem é obrigatória",
        messageMax: "Máximo 1000 caracteres",
      },
      toast: {
        sentTitle: "Mensagem enviada!",
        sentDesc: "Obrigado por escreveres. Responderemos em breve.",
        waitTitle: "Espera um momento",
        waitDesc: "Demora uns segundos a rever o formulário.",
        cooldownTitle: "Demasiados envios",
        cooldownDesc: (s: number) => `Espera ${s}s antes de enviar outra mensagem.`,
        errorTitle: "Falha ao enviar",
        errorDesc: "Tenta novamente daqui a uns minutos.",
      },
    },
    footer: {
      tagline: "Segue-nos para não perderes nenhuma conversa.",
      brand: "La salida de la caverna",
      brandSub: "Conversas reais a partir da sala de aula.",
      rights: "Todos os direitos reservados.",
    },
  },
  ru: {
    htmlLang: "ru",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Проект" },
        { href: "#social", label: "Соцсети" },
        { href: "/articulos", label: "Статьи" },
        { href: "#contact", label: "Контакты" },
      ],
      youtube: "Эпизоды",
      langSwitch: "RU",
      langSwitchAria: "Выбрать язык",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "То, о чём никто",
      titleLine2: "тебе не расскажет",
      subtitle:
        "Настоящие разговоры с профессионалами, журналистами и учителями. Без сценария. Без фильтра. Записано в школе.",
      ctaPrimary: "Смотреть эпизоды",
      ctaSecondary: "Узнать о проекте",
      heroAlt: "Пещера со светом — метафора критического мышления",
    },
    about: {
      title: "Что такое La salida de la caverna?",
      intro:
        "Ток-шоу, где реальные люди говорят о том, что действительно важно. Никаких пустых речей и навязанных дебатов: здесь думают вслух, уважительно спорят и говорят то, что многие думают, но мало кто произносит.",
      quote:
        "Выйти из пещеры — не значит найти ответы, это значит осмелиться задать вопросы.",
      features: [
        {
          title: "Разговоры без сценария",
          description:
            "Мы приглашаем профессионалов, журналистов и учителей к камере. Без согласованных вопросов и заученных ответов.",
        },
        {
          title: "Важные темы",
          description:
            "Образование, свобода, правда, соцсети, психическое здоровье… Темы, которые касаются твоей жизни, обсуждаются честно.",
        },
        {
          title: "Из школы",
          description:
            "Записано в настоящем учебном заведении. Пространство, где идеи встречаются с реальностью тех, кто живёт ими каждый день.",
        },
      ],
    },
    videos: {
      badge: "Последние видео",
      title: "Новое на канале",
      seeAll: "Смотреть всё на YouTube →",
      episodeLabel: "Эпизод",
      dateLocale: "ru-RU",
    },
    social: {
      title: "Найди нас в соцсетях",
      subtitle: "Каждая платформа — свой формат. Одна суть: разговоры, которые важны.",
      platforms: [
        { name: "Spotify", description: "Слушай нас как подкаст", cta: "Слушать" },
        { name: "iVoox", description: "Полные аудиоэпизоды", cta: "Слушать" },
        { name: "YouTube", description: "Полные беседы и эпизоды", cta: "Подписаться" },
        { name: "TikTok", description: "Короткие ролики, заставляющие думать", cta: "Подписаться" },
        { name: "Instagram", description: "За кадром и новости", cta: "Подписаться" },
      ],
    },
    contact: {
      title: "Контакты",
      subtitle: "Есть идея, предложение или хочешь участвовать? Напиши нам.",
      name: "Имя",
      namePh: "Твоё имя",
      email: "Email",
      emailPh: "ты@email.com",
      subject: "Тема",
      subjectPh: "О чём пишешь?",
      message: "Сообщение",
      messagePh: "Расскажи нам...",
      send: "Отправить сообщение",
      sending: "Отправка...",
      errors: {
        nameReq: "Имя обязательно",
        nameMax: "Максимум 100 символов",
        emailInvalid: "Неверный email",
        emailMax: "Максимум 255 символов",
        subjectReq: "Тема обязательна",
        subjectMax: "Максимум 150 символов",
        messageReq: "Сообщение обязательно",
        messageMax: "Максимум 1000 символов",
      },
      toast: {
        sentTitle: "Сообщение отправлено!",
        sentDesc: "Спасибо, что написали. Ответим скоро.",
        waitTitle: "Подожди немного",
        waitDesc: "Проверь форму ещё раз.",
        cooldownTitle: "Слишком много отправок",
        cooldownDesc: (s: number) => `Подожди ${s}с перед отправкой нового сообщения.`,
        errorTitle: "Не удалось отправить",
        errorDesc: "Попробуй снова через несколько минут.",
      },
    },
    footer: {
      tagline: "Подпишись, чтобы не пропустить ни одного разговора.",
      brand: "La salida de la caverna",
      brandSub: "Настоящие разговоры из класса.",
      rights: "Все права защищены.",
    },
  },
  uk: {
    htmlLang: "uk",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Проєкт" },
        { href: "#social", label: "Соцмережі" },
        { href: "/articulos", label: "Статті" },
        { href: "#contact", label: "Контакти" },
      ],
      youtube: "Епізоди",
      langSwitch: "UK",
      langSwitchAria: "Вибрати мову",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "Те, про що ніхто",
      titleLine2: "тобі не розкаже",
      subtitle:
        "Справжні розмови з фахівцями, журналістами та вчителями. Без сценарію. Без фільтра. Записано в школі.",
      ctaPrimary: "Дивитися епізоди",
      ctaSecondary: "Дізнатися про проєкт",
      heroAlt: "Печера зі світлом — метафора критичного мислення",
    },
    about: {
      title: "Що таке La salida de la caverna?",
      intro:
        "Ток-шоу, де справжні люди говорять про те, що дійсно важливо. Жодних пустих промов і нав'язаних дебатів: тут думають вголос, шанобливо сперечаються й говорять те, про що багато хто думає, але мало хто промовляє.",
      quote:
        "Вийти з печери — не означає знайти відповіді, це означає наважитися поставити запитання.",
      features: [
        {
          title: "Розмови без сценарію",
          description:
            "Запрошуємо фахівців, журналістів і вчителів до камери. Без узгоджених запитань і завчених відповідей.",
        },
        {
          title: "Важливі теми",
          description:
            "Освіта, свобода, правда, соцмережі, психічне здоров'я… Теми, що впливають на твоє життя, обговорюються чесно.",
        },
        {
          title: "Зі школи",
          description:
            "Записано у справжньому освітньому закладі. Простір, де ідеї зустрічаються з реальністю тих, хто ними живе.",
        },
      ],
    },
    videos: {
      badge: "Останні відео",
      title: "Нове на каналі",
      seeAll: "Дивитися все на YouTube →",
      episodeLabel: "Епізод",
      dateLocale: "uk-UA",
    },
    social: {
      title: "Знайди нас у соцмережах",
      subtitle: "Кожна платформа — свій формат. Одна суть: розмови, що мають значення.",
      platforms: [
        { name: "Spotify", description: "Слухай нас як подкаст", cta: "Слухати" },
        { name: "iVoox", description: "Повні аудіоепізоди", cta: "Слухати" },
        { name: "YouTube", description: "Повні бесіди та епізоди", cta: "Підписатися" },
        { name: "TikTok", description: "Короткі ролики, що змушують думати", cta: "Підписатися" },
        { name: "Instagram", description: "За кадром і новини", cta: "Підписатися" },
      ],
    },
    contact: {
      title: "Контакти",
      subtitle: "Є ідея, пропозиція або хочеш долучитися? Напиши нам.",
      name: "Ім'я",
      namePh: "Твоє ім'я",
      email: "Email",
      emailPh: "ти@email.com",
      subject: "Тема",
      subjectPh: "Про що пишеш?",
      message: "Повідомлення",
      messagePh: "Розкажи нам...",
      send: "Надіслати повідомлення",
      sending: "Надсилання...",
      errors: {
        nameReq: "Ім'я обов'язкове",
        nameMax: "Максимум 100 символів",
        emailInvalid: "Неправильний email",
        emailMax: "Максимум 255 символів",
        subjectReq: "Тема обов'язкова",
        subjectMax: "Максимум 150 символів",
        messageReq: "Повідомлення обов'язкове",
        messageMax: "Максимум 1000 символів",
      },
      toast: {
        sentTitle: "Повідомлення надіслано!",
        sentDesc: "Дякуємо, що написав. Відповімо незабаром.",
        waitTitle: "Зачекай хвилинку",
        waitDesc: "Перевір форму ще раз.",
        cooldownTitle: "Забагато надсилань",
        cooldownDesc: (s: number) => `Зачекай ${s}с перед наступним повідомленням.`,
        errorTitle: "Не вдалося надіслати",
        errorDesc: "Спробуй ще раз за кілька хвилин.",
      },
    },
    footer: {
      tagline: "Підпишись, щоб не пропустити жодну розмову.",
      brand: "La salida de la caverna",
      brandSub: "Справжні розмови з класу.",
      rights: "Усі права захищено.",
    },
  },
  sv: {
    htmlLang: "sv",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "Projekt" },
        { href: "#social", label: "Sociala medier" },
        { href: "/articulos", label: "Artiklar" },
        { href: "#contact", label: "Kontakt" },
      ],
      youtube: "Avsnitt",
      langSwitch: "SV",
      langSwitchAria: "Välj språk",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "Det ingen",
      titleLine2: "berättar för dig",
      subtitle:
        "Riktiga samtal med yrkesverksamma, journalister och lärare. Utan manus. Utan filter. Inspelat på en skola.",
      ctaPrimary: "Se avsnitt",
      ctaSecondary: "Upptäck projektet",
      heroAlt: "Grotta med ljus — metafor för kritiskt tänkande",
    },
    about: {
      title: "Vad är La salida de la caverna?",
      intro:
        "En talkshow där riktiga människor pratar om det som verkligen betyder något. Inga tomma tal eller påtvingade debatter: här tänker man högt, är oense med respekt och säger det många tänker men få vågar säga.",
      quote:
        "Att lämna grottan handlar inte om att hitta svar — det handlar om att våga ställa frågorna.",
      features: [
        {
          title: "Samtal utan manus",
          description:
            "Vi bjuder in yrkesverksamma, journalister och lärare framför kameran. Inga förhandsbestämda frågor, inga inövade svar.",
        },
        {
          title: "Ämnen som betyder något",
          description:
            "Utbildning, frihet, sanning, sociala medier, psykisk hälsa… Ämnen som påverkar din vardag, behandlade med ärlighet.",
        },
        {
          title: "Från en skola",
          description:
            "Inspelat på en riktig utbildningsplats. En plats där idéer möter verkligheten hos dem som lever dem varje dag.",
        },
      ],
    },
    videos: {
      badge: "Senaste videor",
      title: "Nytt på kanalen",
      seeAll: "Se allt på YouTube →",
      episodeLabel: "Avsnitt",
      dateLocale: "sv-SE",
    },
    social: {
      title: "Hitta oss på sociala medier",
      subtitle: "Varje plattform, ett eget format. Samma kärna: samtal som betyder något.",
      platforms: [
        { name: "Spotify", description: "Lyssna på oss som podcast", cta: "Lyssna" },
        { name: "iVoox", description: "Hela avsnitt i ljud", cta: "Lyssna" },
        { name: "YouTube", description: "Hela samtal och avsnitt", cta: "Prenumerera" },
        { name: "TikTok", description: "Korta klipp som får dig att tänka", cta: "Följ oss" },
        { name: "Instagram", description: "Bakom kulisserna och nyheter", cta: "Följ oss" },
      ],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Har du en idé, ett förslag eller vill delta? Skriv till oss.",
      name: "Namn",
      namePh: "Ditt namn",
      email: "E-post",
      emailPh: "du@email.com",
      subject: "Ämne",
      subjectPh: "Vad gäller det?",
      message: "Meddelande",
      messagePh: "Berätta för oss...",
      send: "Skicka meddelande",
      sending: "Skickar...",
      errors: {
        nameReq: "Namn krävs",
        nameMax: "Max 100 tecken",
        emailInvalid: "Ogiltig e-post",
        emailMax: "Max 255 tecken",
        subjectReq: "Ämne krävs",
        subjectMax: "Max 150 tecken",
        messageReq: "Meddelande krävs",
        messageMax: "Max 1000 tecken",
      },
      toast: {
        sentTitle: "Meddelande skickat!",
        sentDesc: "Tack för att du hörde av dig. Vi svarar snart.",
        waitTitle: "Vänta lite",
        waitDesc: "Ta några sekunder att granska formuläret.",
        cooldownTitle: "För många inskickningar",
        cooldownDesc: (s: number) => `Vänta ${s}s innan du skickar ett nytt meddelande.`,
        errorTitle: "Kunde inte skicka",
        errorDesc: "Försök igen om några minuter.",
      },
    },
    footer: {
      tagline: "Följ oss så du inte missar ett enda samtal.",
      brand: "La salida de la caverna",
      brandSub: "Riktiga samtal från klassrummet.",
      rights: "Alla rättigheter förbehållna.",
    },
  },
  zh: {
    htmlLang: "zh-CN",
    nav: {
      brandPrefix: "La salida",
      brandSuffix: " de la caverna",
      links: [
        { href: "#about", label: "项目" },
        { href: "#social", label: "社交媒体" },
        { href: "/articulos", label: "文章" },
        { href: "#contact", label: "联系" },
      ],
      youtube: "节目",
      langSwitch: "ZH",
      langSwitchAria: "选择语言",
    },
    hero: {
      kicker: "La salida de la caverna",
      titleLine1: "没人会告诉你的",
      titleLine2: "那些事",
      subtitle:
        "与专业人士、记者和教师的真实对话。没有剧本。没有滤镜。在一所中学录制。",
      ctaPrimary: "观看节目",
      ctaSecondary: "了解项目",
      heroAlt: "光中的洞穴——批判性思维的隐喻",
    },
    about: {
      title: "什么是 La salida de la caverna?",
      intro:
        "这是一档真实的对话节目,真实的人讨论真正重要的话题。没有空洞的演讲,也没有刻意的辩论:这里是大声思考、礼貌分歧、说出许多人想说却很少人敢说的话的地方。",
      quote:
        "走出洞穴不是找到答案,而是敢于提出问题。",
      features: [
        {
          title: "无剧本的对话",
          description:
            "我们邀请专业人士、记者和教师面对镜头。没有事先约定的问题,也没有排练过的回答。",
        },
        {
          title: "重要的话题",
          description:
            "教育、自由、真相、社交媒体、心理健康……影响你日常生活的话题,以诚实的方式呈现。",
        },
        {
          title: "来自一所中学",
          description:
            "在真实的教育空间中录制。一个让想法与每天经历它们的人的现实相遇的地方。",
        },
      ],
    },
    videos: {
      badge: "最新视频",
      title: "频道新内容",
      seeAll: "在 YouTube 上查看全部 →",
      episodeLabel: "第",
      dateLocale: "zh-CN",
    },
    social: {
      title: "在社交媒体上找到我们",
      subtitle: "每个平台,不同的形式。同样的核心:重要的对话。",
      platforms: [
        { name: "Spotify", description: "以播客形式收听", cta: "收听" },
        { name: "iVoox", description: "完整音频节目", cta: "收听" },
        { name: "YouTube", description: "完整的对话和节目", cta: "订阅" },
        { name: "TikTok", description: "引发思考的短片", cta: "关注" },
        { name: "Instagram", description: "幕后花絮和最新动态", cta: "关注" },
      ],
    },
    contact: {
      title: "联系我们",
      subtitle: "有想法、提议或想参与?给我们留言。",
      name: "姓名",
      namePh: "你的姓名",
      email: "电子邮箱",
      emailPh: "you@email.com",
      subject: "主题",
      subjectPh: "关于什么?",
      message: "信息",
      messagePh: "告诉我们……",
      send: "发送信息",
      sending: "发送中……",
      errors: {
        nameReq: "姓名必填",
        nameMax: "最多 100 字符",
        emailInvalid: "邮箱无效",
        emailMax: "最多 255 字符",
        subjectReq: "主题必填",
        subjectMax: "最多 150 字符",
        messageReq: "信息必填",
        messageMax: "最多 1000 字符",
      },
      toast: {
        sentTitle: "信息已发送!",
        sentDesc: "感谢你的留言,我们会尽快回复。",
        waitTitle: "请稍等",
        waitDesc: "请花几秒钟检查表单。",
        cooldownTitle: "提交过于频繁",
        cooldownDesc: (s: number) => `请等待 ${s} 秒后再发送新信息。`,
        errorTitle: "发送失败",
        errorDesc: "请几分钟后重试。",
      },
    },
    footer: {
      tagline: "关注我们,不错过任何一场对话。",
      brand: "La salida de la caverna",
      brandSub: "来自教室的真实对话。",
      rights: "保留所有权利。",
    },
  },
};

export type Translation = typeof translations.es;