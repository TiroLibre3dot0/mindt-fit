// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MindtPage from "./components/Mindt/MindtPage";
import { LanguageProvider } from "./context/LanguageContext";

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="*" element={<MindtPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
