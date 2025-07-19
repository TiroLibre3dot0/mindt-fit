import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateInsight({ question, answer, lang = "en" }) {
  const prompt = `
You are a concise burnout coach.

The user was asked:
"${question}"

They replied:
"${answer}"

Write a very short and warm reflection in ${lang}, strictly within 20 words.

🟢 Tone: friendly, grounded, never generic and always proactive
🔴 Do not mention other people, statistics, or what's common.
✅ Focus only on this user’s answer.
✨ Suggest one micro-action or thought, if relevant.

Output only the message. No intro, no explanation.
`;

  try {
    const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: `You are a supportive burnout assistant. Always respond in ${lang}.`
    },
    {
      role: "user",
      content: prompt
    }
  ],
});

    return response.choices[0]?.message?.content?.trim();
  } catch (error) {
    console.error("Errore generazione insight:", error.message);
    return "Sorry, something went wrong while generating your insight.";
  }
}
