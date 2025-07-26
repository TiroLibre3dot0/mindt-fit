import { useState } from "react";
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "./authService";
import { updateLastLogin } from "./firestoreService";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      toast.success("Registrazione completata");
      return true;
    } catch (err) {
      toast.error(err.message || "Errore nella registrazione");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      const auth = getAuth();
      await updateLastLogin(auth.currentUser.uid);
      toast.success("Login effettuato");
      return true;
    } catch (err) {
      toast.error(err.message || "Credenziali non valide");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogleAccount = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      const auth = getAuth();
      await updateLastLogin(auth.currentUser.uid);
      toast.success("Accesso con Google completato");
      return true;
    } catch (err) {
      toast.error(err.message || "Errore con Google Sign-in");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loginUser,
    loginWithGoogleAccount,
    loading,
  };
};
