// /api/insight.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer, language } = req.body;

  console.log("➡️ Incoming request to /api/insight:", { question, answer, language });

  if (!openai.apiKey) {
    console.error("❌ OPENAI_API_KEY is not defined");
    return res.status(500).json({ error: "OpenAI API key not set in environment." });
  }

  try {
    const prompt = `
      Rispondi in ${language}.
      Domanda: ${question}
      Risposta dell'utente: ${answer}
      Genera un breve insight empatico e motivazionale in massimo due frasi.
    `;

    const completion = await openai.chat.completions.create({
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

    const result = completion.choices?.[0]?.message?.content;

    if (!result) {
      console.error("❌ GPT returned no insight.");
      return res.status(500).json({ error: "Insight not generated" });
    }

    console.log("✅ Insight generated:", result);
    res.status(200).json({ insight: result });
  } catch (error) {
    console.error("❌ Insight API Error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Insight generation failed" });
  }
}
