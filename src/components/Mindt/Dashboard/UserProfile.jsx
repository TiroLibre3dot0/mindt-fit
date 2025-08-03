// src/components/Mindt/Dashboard/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useLanguage } from "../../../context/LanguageContext";
import { useBurnout } from "../../../context/BurnoutContext";
import { getColorPalette } from "../../../utils/burnoutColors";
import MentalBattery from "../flow/MentalBattery";
import AuthButton from "../RegisterLogin/AuthButton";
import { useAuthContext } from "../../../context/AuthContext";

const UserProfile = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { burnoutLevel } = useBurnout();
  const palette = getColorPalette(burnoutLevel);
  const { logout } = useAuthContext();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    fetchUserData();
  }, [uid]);

  const handleLogout = async () => {
    await logout();
    navigate("/mindt-login");
  };

  if (!userData) {
    return <div className="text-white p-10">Loading profile...</div>;
  }

  const insights = {
    it: "Oggi è un buon giorno per riequilibrare mente e corpo.",
    en: "Today is a good day to rebalance your mind and body.",
    es: "Hoy es un buen día para equilibrar mente y cuerpo.",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white"
      style={{
        background: `linear-gradient(to bottom, ${palette.main}, ${palette.light})`,
      }}
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">
          {language === "it" && `Ciao ${userData.name}`}
          {language === "en" && `Hello ${userData.name}`}
          {language === "es" && `Hola ${userData.name}`}
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Mental Battery</h2>
          <MentalBattery burnoutLevel={burnoutLevel} />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Insight</h2>
          <p className="text-sm italic">{insights[language]}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Snack Consigliato</h2>
          <p className="text-sm">Calm Bar - Ashwagandha, Camomilla, Zinco</p>
        </div>

        <AuthButton
          text={
            language === "it"
              ? "Vai alla Dashboard"
              : language === "en"
              ? "Go to Dashboard"
              : "Ir al panel"
          }
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate("/mindt-dashboard")}
        />

        <AuthButton
          text="Logout"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 mt-4"
        />
      </div>
    </div>
  );
};

export default UserProfile;
