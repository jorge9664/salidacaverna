const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PROJECT_CONTEXT = `
"La salida de la caverna" es un proyecto audiovisual de charlas filosóficas dirigido a jóvenes.
Cada programa ("... | Salida de la Caverna #N") es una conversación abierta sobre un tema
filosófico, ético, político o social: el bien objetivo o subjetivo, la identidad de género,
la seguridad y la privacidad, la libertad, la verdad, la tecnología, el sentido de la vida, etc.
El nombre alude al mito de la caverna de Platón: salir de las sombras hacia la luz del conocimiento.
El tono es cercano, riguroso y no dogmático: se exponen argumentos de distintas posiciones,
se citan filósofos cuando aporta, y nunca se adoctrina ni se falta al respeto.
El proyecto está en YouTube, Spotify, iVoox, Apple Podcasts, Amazon Music, Instagram y TikTok.
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const { question, lang = "es", videos = [] } = await req.json();

    if (typeof question !== "string" || question.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: "invalid_question" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (question.length > 1000) {
      return new Response(
        JSON.stringify({ error: "question_too_long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const titles = Array.isArray(videos)
      ? videos.filter((v: unknown) => typeof v === "string").slice(0, 25)
      : [];

    const instructions = `Eres el asistente reflexivo del proyecto ${PROJECT_CONTEXT}

${titles.length ? `Episodios publicados:\n- ${titles.join("\n- ")}\n` : ""}
Responde a la pregunta del visitante sobre los vídeos y temas del proyecto con una reflexión
filosófica breve (máximo 250 palabras), clara y honesta: plantea las distintas posturas,
menciona algún episodio relacionado si encaja, y termina con una pregunta que invite a pensar.
Si la pregunta no tiene relación con filosofía ni con el proyecto, dilo con amabilidad y
reconduce hacia un tema del proyecto. No inventes datos concretos (fechas, cifras, invitados).
Escribe íntegramente en este idioma (código ISO): ${lang}.`;

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions,
        input: [
          { role: "user", content: [{ type: "input_text", text: question }] },
        ],
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const body = await upstream.text();
      console.error("AI gateway error", upstream.status, body);
      return new Response(
        JSON.stringify({ error: "ai_error", status: upstream.status }),
        {
          status: upstream.status === 429 || upstream.status === 402
            ? upstream.status
            : 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Relay only the answer text as a plain text stream.
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const evt = JSON.parse(data);
                if (evt.type === "response.output_text.delta" && evt.delta) {
                  controller.enqueue(encoder.encode(evt.delta));
                }
              } catch {
                /* ignore partial json */
              }
            }
          }
          controller.close();
        } catch (err) {
          console.error("stream error", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("ask-caverna error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
