// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Leggi utente da localStorage al primo caricamento
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout automatico + rimuovi dati
  const logout = () => {
    localStorage.removMindtem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizzato per usare il contesto
export const useUser = () => useContext(UserContext);
