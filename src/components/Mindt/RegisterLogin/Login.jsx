// src/components/Mindt/RegisterLogin/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import ToggleAuthMode from "./ToggleAuthMode";
import { useAuth } from "./useAuth";
import { FcGoogle } from "react-icons/fc";
import RegisterLoginWrapper from "./RegisterLoginWrapper";
import toast from "react-hot-toast";
import { updateLastLogin } from "./firestoreService";
import { getAuth } from "firebase/auth";
import { useLanguage } from "../../../context/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loginWithGoogleAccount } = useAuth();
  const { language } = useLanguage();

  const translations = {
    it: {
      title: "Accedi al tuo profilo Mindt",
      email: "Email",
      password: "Password",
      login: "Accedi",
      google: "Accedi con Google",
      noAccount: "Non hai un profilo?",
      register: "Registrati",
      error: "Accesso non riuscito. Controlla le credenziali.",
    },
    en: {
      title: "Login to your Mindt profile",
      email: "Email",
      password: "Password",
      login: "Login",
      google: "Login with Google",
      noAccount: "Don’t have an account?",
      register: "Sign Up",
      error: "Login failed. Check your credentials.",
    },
    es: {
      title: "Inicia sesión en tu perfil Mindt",
      email: "Correo electrónico",
      password: "Contraseña",
      login: "Iniciar sesión",
      google: "Iniciar sesión con Google",
      noAccount: "¿No tienes una cuenta?",
      register: "Regístrate",
      error: "Error al iniciar sesión. Verifica tus credenciales.",
    },
  };

  const t = translations[language];

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginUser(form.email, form.password);
    if (success) {
      const auth = getAuth();
      const user = auth.currentUser;
      await updateLastLogin(user.uid);
      navigate("/mindt-dashboard");
    } else {
      toast.error(t.error);
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogleAccount();
    if (success) {
      const auth = getAuth();
      const user = auth.currentUser;
      await updateLastLogin(user.uid);
      navigate("/mindt-dashboard");
    } else {
      toast.error(t.error);
    }
  };

  return (
    <RegisterLoginWrapper>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-white text-center mb-2">{t.title}</h2>

        <AuthInput
          type="email"
          name="email"
          placeholder={t.email}
          value={form.email}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder={t.password}
          value={form.password}
          onChange={handleChange}
        />

        <AuthButton text={t.login} className="bg-[#f17b4e] hover:bg-[#e56733]" />

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-white/30 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">{t.google}</span>
        </button>

        <ToggleAuthMode text={t.noAccount} linkText={t.register} to="/mindt-register" />
      </form>
    </RegisterLoginWrapper>
  );
};

export default Login;
