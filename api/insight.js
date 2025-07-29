// /api/insight.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer, language } = req.body;

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
      throw new Error("Insight non generato da GPT");
    }

    res.status(200).json({ insight: result });
  } catch (error) {
    console.error("❌ Insight API Error:", error);
    res.status(500).json({ error: "Errore nella generazione dell’insight." });
  }
}
