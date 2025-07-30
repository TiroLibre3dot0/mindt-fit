import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answers, insights, lang, ee, dp, rp } = req.body;

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const scoreSummary = `
📊 Emotional Exhaustion (EE): ${ee}
📊 Depersonalization (DP): ${dp}
📊 Personal Achievement (RP): ${rp}
`;

    const text = answers
      .map((a, i) => `Domanda: ${a.question}\nRisposta: ${a.answer}\nInsight: ${insights[i]}`)
      .join("\n\n");

    const prompt = `
Analizza il seguente percorso risposte + insight + punteggi. Massimo 4 frasi. Tono realistico, motivazionale.
Rispondi in ${lang}.

${scoreSummary}

${text}
`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Sei un assistente empatico che analizza punteggi e insight per creare un riassunto motivazionale dello stato psicofisico dell’utente.",
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
