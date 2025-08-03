// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MindtHome from "./components/Mindt/MindtHome";
import MindtFinale from "./components/Mindt/flow/MindtFinale";
import { LanguageProvider } from "./context/LanguageContext";
import { BurnoutProvider } from "./context/BurnoutContext";
import FlowDebugger from "./components/Dev/FlowDebugger";

// 👇 Importa le pagine di login e registrazione
import Register from "./components/Mindt/RegisterLogin/Register";
import Login from "./components/Mindt/RegisterLogin/Login";

// ✅ Importa la nuova pagina shop
import ShopPage from "./components/Mindt/Shop/ShopPage";

const App = () => {
  return (
    <BurnoutProvider>
      <LanguageProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* 🧠 Home + percorso */}
            <Route path="/" element={<MindtHome />} />
            <Route path="/mindt-finale" element={<MindtFinale />} />

            {/* 🛒 Shop */}
            <Route path="/shop" element={<ShopPage />} />

            {/* 👤 Autenticazione */}
            <Route path="/mindt-register" element={<Register />} />
            <Route path="/mindt-login" element={<Login />} />

            {/* 🚫 Fallback */}
            <Route path="*" element={<MindtHome />} />
          </Routes>

          {/* 🐛 Debug solo in sviluppo */}
          {import.meta.env.DEV && <FlowDebugger />}
        </Router>
      </LanguageProvider>
    </BurnoutProvider>
  );
};

export default App;
