import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answers, insights, lang } = req.body;

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const text = answers
      .map((a, i) => `Domanda: ${a.question}\nRisposta: ${a.answer}\nInsight: ${insights[i]}`)
      .join("\n\n");

    const prompt = `
      Analizza il seguente percorso risposte + insight e scrivi un riepilogo finale realistico, breve, motivazionale.
      Massimo 4 frasi. Rispondi in ${lang}.

      ${text}
    `;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Sei un assistente empatico che analizza i dati dell’utente per fornirgli un riassunto motivazionale del proprio stato psicofisico.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.status(200).json({ summary: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("❌ Final Summary API Error:", error);
    res.status(500).json({ error: "Errore nella generazione del riepilogo finale" });
  }
}
