// 🔍 Insight per singola risposta
export const getInsightFromGPT = async ({ question, answer, language = "en" }) => {
  try {
    const response = await fetch("/api/insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, answer, language }),
    });

    if (!response.ok) throw new Error("Server response not ok");

    const data = await response.json();
    return data.insight;
  } catch (error) {
    console.error("❌ GPT API Error:", error);
    return language === "it"
      ? "Al momento non riusciamo a generare un feedback per questa risposta."
      : "We're having trouble generating insights at the moment.";
  }
};

// 🧠 Riepilogo finale personalizzato
export const getFinalSummary = async ({ answers, insights, language = "en" }) => {
  try {
    const response = await fetch("/api/final-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers, insights, lang: language }),
    });

    if (!response.ok) throw new Error("Server response not ok");

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error("❌ Final Summary API Error:", error);
    return language === "it"
      ? "Non siamo riusciti a generare un feedback finale al momento."
      : "We weren't able to generate your final feedback right now.";
  }
};
