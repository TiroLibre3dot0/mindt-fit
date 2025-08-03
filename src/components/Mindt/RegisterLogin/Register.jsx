import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import ToggleAuthMode from "./ToggleAuthMode";
import { useAuth } from "./useAuth";
import { FcGoogle } from "react-icons/fc";
import RegisterLoginWrapper from "./RegisterLoginWrapper";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { saveUserProfile } from "./firestoreService";
import { useLanguage } from "../../../context/LanguageContext";

// Nuovi import
import { useBurnout } from "../../../context/BurnoutContext";
import { getColorPalette } from "../../../utils/burnoutColors";
import NavbarMindt from "../NavbarMindt";
import MentalBattery from "../flow/MentalBattery";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, loginWithGoogleAccount } = useAuth();
  const { language } = useLanguage();
  const { burnoutLevel } = useBurnout();
  const palette = getColorPalette(burnoutLevel);

  const translations = {
    it: {
      title: "Crea il tuo profilo Mindt",
      name: "Nome",
      surname: "Cognome",
      email: "Email",
      password: "Password",
      confirmPassword: "Conferma Password",
      register: "Registrati con Email",
      google: "Registrati con Google",
      already: "Hai già un profilo?",
      login: "Accedi",
      error: "Le password non coincidono",
    },
    en: {
      title: "Create your Mindt profile",
      name: "First Name",
      surname: "Last Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      register: "Sign Up with Email",
      google: "Sign Up with Google",
      already: "Already have an account?",
      login: "Login",
      error: "Passwords do not match",
    },
    es: {
      title: "Crea tu perfil Mindt",
      name: "Nombre",
      surname: "Apellido",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      register: "Regístrate con Email",
      google: "Regístrate con Google",
      already: "¿Ya tienes una cuenta?",
      login: "Iniciar sesión",
      error: "Las contraseñas no coinciden",
    },
  };

  const t = translations[language];

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error(t.error);
      return;
    }

    const success = await registerUser(form.email, form.password);
    if (success) {
      const auth = getAuth();
      const user = auth.currentUser;

      await saveUserProfile(user.uid, {
        name: form.name,
        surname: form.surname,
        email: form.email,
        language,
      });

      navigate(`/mindt-profilo/${user.uid}`);
    }
  };

  const handleGoogleRegister = async () => {
    const success = await loginWithGoogleAccount();
    if (success) navigate(`/mindt-profilo/${user.uid}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(to bottom, ${palette.main}, ${palette.light})`,
      }}
    >
      {/* Navbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
              <NavbarMindt
                activeId="signin"
                highlightColors={{ color: palette.main, hover: palette.light }}
              />
            </div>

      {/* Mental Battery */}
      <div className="absolute top-4 right-4 scale-[0.7] sm:scale-90 z-50">
        <MentalBattery burnoutLevel={burnoutLevel} />
      </div>

      {/* Register Form */}
      <RegisterLoginWrapper>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-white text-center mb-2">{t.title}</h2>

          <AuthInput
            type="text"
            name="name"
            placeholder={t.name}
            value={form.name}
            onChange={handleChange}
          />
          <AuthInput
            type="text"
            name="surname"
            placeholder={t.surname}
            value={form.surname}
            onChange={handleChange}
          />
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
          <AuthInput
            type="password"
            name="confirmPassword"
            placeholder={t.confirmPassword}
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <AuthButton
            text={t.register}
            className="bg-[#f17b4e] hover:bg-[#e56733]"
          />

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 border border-white/30 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-medium">{t.google}</span>
          </button>

          <ToggleAuthMode
            text={t.already}
            linkText={t.login}
            to="/mindt-login"
          />
        </form>
      </RegisterLoginWrapper>
    </div>
  );
};

export default Register;
