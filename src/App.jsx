// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getAuth } from "firebase/auth";

import MindtHome from "./components/Mindt/MindtHome";
import MindtFinale from "./components/Mindt/flow/MindtFinale";
import ShopPage from "./components/Mindt/Shop/ShopPage";
import Register from "./components/Mindt/RegisterLogin/Register";
import Login from "./components/Mindt/RegisterLogin/Login";
import DashboardMindt from "./components/Mindt/Dashboard/DashboardMindt";
import UserProfile from "./components/Mindt/Dashboard/UserProfile";

import FlowDebugger from "./components/Dev/FlowDebugger";
import { LanguageProvider } from "./context/LanguageContext";
import { BurnoutProvider } from "./context/BurnoutContext";
import { AuthProvider, useAuthContext } from "./context/AuthContext";

// ✅ Route protetta
const PrivateRoute = ({ children }) => {
  const { user, checking } = useAuthContext();

  if (checking) return <div className="text-white p-10">Loading...</div>;

  return user ? children : <Navigate to="/mindt-login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BurnoutProvider>
        <LanguageProvider>
          <Router>
            <Toaster position="top-right" />

            <Routes>
              {/* 🧠 Home + flusso */}
              <Route path="/" element={<MindtHome />} />
              <Route path="/mindt-finale" element={<MindtFinale />} />

              {/* 🛒 Shop */}
              <Route path="/shop" element={<ShopPage />} />

              {/* 👤 Autenticazione */}
              <Route path="/mindt-register" element={<Register />} />
              <Route path="/mindt-login" element={<Login />} />

              {/* 🔒 Pagine protette */}
              <Route
                path="/mindt-profilo/:uid"
                element={
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mindt-dashboard"
                element={
                  <PrivateRoute>
                    <DashboardMindt />
                  </PrivateRoute>
                }
              />

              {/* 🚫 Fallback */}
              <Route path="*" element={<MindtHome />} />
            </Routes>

            {/* 🐛 Debug solo in sviluppo */}
            {import.meta.env.DEV && <FlowDebugger />}
          </Router>
        </LanguageProvider>
      </BurnoutProvider>
    </AuthProvider>
  );
};

export default App;
