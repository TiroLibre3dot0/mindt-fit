import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer, language } = req.body;

  // 🔒 Verifica che la chiave OpenAI sia presente
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY non definita nel backend.");
    return res.status(500).json({ error: "API key mancante nel server." });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const prompt = `
      Rispondi in ${language}.
      Domanda: ${question}
      Risposta dell'utente: ${answer}
      Genera un breve insight empatico e motivazionale in massimo due frasi.
    `;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Sei un coach digitale esperto in burnout. Rispondi sempre in ${language}.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = completion.data.choices?.[0]?.message?.content;

    if (!result) {
      console.error("❌ Nessun contenuto restituito da GPT.");
      return res.status(500).json({ error: "Insight non generato da GPT." });
    }

    res.status(200).json({ insight: result });
  } catch (error) {
    console.error("❌ Insight API Error:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Errore nella generazione dell’insight." });
  }
}
