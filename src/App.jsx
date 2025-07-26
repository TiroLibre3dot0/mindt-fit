// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MindtPage from "./components/Mindt/MindtPage";
import MindtFinale from "./components/Mindt/flow/MindtFinale";
import { LanguageProvider } from "./context/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<MindtPage />} />
          <Route path="/mindt-finale" element={<MindtFinale />} />
          <Route path="*" element={<MindtPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
