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

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<MindtPage />} />
          <Route path="/mindt-finale" element={<MindtFinale />} />

          {/* ✅ Route di autenticazione */}
          <Route path="/mindt-register" element={<Register />} />
          <Route path="/mindt-login" element={<Login />} />

          {/* ✅ Route fallback */}
          <Route path="*" element={<MindtPage />} />
        </Routes>

        {/* ✅ Flow debugger solo in sviluppo */}
        {import.meta.env.DEV && <FlowDebugger />}
      </Router>
    </LanguageProvider>
  );
};

export default App;
