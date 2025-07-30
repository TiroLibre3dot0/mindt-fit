// src/components/Mindt/flow/getRealtimeInsight.js

const getRealtimeInsight = async (question, answer, language = "en") => {
  const isLocalhost = window.location.hostname === "localhost";
  const baseUrl = isLocalhost ? "http://localhost:3001" : "";

  try {
    const response = await fetch(`${baseUrl}/api/insight`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, lang: language }), // ✅ "lang" invece di "language"
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Insight API response:", errorText);
      throw new Error("Insight generation failed");
    }

    const data = await response.json();
    console.log("✅ Insight ricevuto dal server:", data.insight);
    return data.insight;
  } catch (error) {
    console.error("❌ GPT API Error:", error.message);
    return language === "it"
      ? "⚠️ Insight non disponibile al momento."
      : "⚠️ Insight temporarily unavailable.";
  }
};

export default getRealtimeInsight;
