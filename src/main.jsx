// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ Importa il LanguageProvider
import { LanguageProvider } from './context/LanguageContext'

// ✅ Importa il Toaster di react-hot-toast
import { Toaster } from 'react-hot-toast'

// Controlla il path attuale e assegna classe dinamica al root
const setRootClass = () => {
  const root = document.getElementById('root');
  if (!root) return;

  // Aggiungi la classe 'no-max' solo nelle pagine dashboard
  if (window.location.pathname.includes("/dashboard")) {
    root.classList.add("no-max");
  } else {
    root.classList.remove("no-max");
  }
};

// Esegui subito appena la pagina carica
setRootClass();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <>
        <App />
        <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
      </>
    </LanguageProvider>
  </StrictMode>
);
