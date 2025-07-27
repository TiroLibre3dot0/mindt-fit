import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MindtPage from "./components/Mindt/MindtPage";
import MindtFinale from "./components/Mindt/flow/MindtFinale";
import { LanguageProvider } from "./context/LanguageContext";
import FlowDebugger from "./components/Dev/FlowDebugger";

// 👇 Importa le pagine di login e registrazione
import Register from "./components/Mindt/RegisterLogin/Register";
import Login from "./components/Mindt/RegisterLogin/Login";

// ✅ Importa la nuova pagina shop
import ShopPage from "./components/Mindt/Shop/ShopPage";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* 🧠 Home + percorso */}
          <Route path="/" element={<MindtPage />} />
          <Route path="/mindt-finale" element={<MindtFinale />} />

          {/* 🛒 Shop */}
          <Route path="/shop" element={<ShopPage />} />

          {/* 👤 Autenticazione */}
          <Route path="/mindt-register" element={<Register />} />
          <Route path="/mindt-login" element={<Login />} />

          {/* 🚫 Fallback */}
          <Route path="*" element={<MindtPage />} />
        </Routes>

        {/* 🐛 Debug solo in sviluppo */}
        {import.meta.env.DEV && <FlowDebugger />}
      </Router>
    </LanguageProvider>
  );
};

export default App;
