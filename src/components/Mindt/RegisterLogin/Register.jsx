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

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, loginWithGoogleAccount } = useAuth();

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
      toast.error("Le password non coincidono");
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
      });

      navigate("/mindt-dashboard");
    }
  };

  const handleGoogleRegister = async () => {
    const success = await loginWithGoogleAccount();
    if (success) navigate("/mindt-dashboard");
  };

  return (
    <RegisterLoginWrapper>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Crea il tuo profilo Mindt
        </h2>

        <AuthInput
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />
        <AuthInput
          type="text"
          name="surname"
          placeholder="Cognome"
          value={form.surname}
          onChange={handleChange}
        />
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="confirmPassword"
          placeholder="Conferma Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <AuthButton text="Registrati con Email" className="bg-[#f17b4e] hover:bg-[#e56733]" />

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border border-white/30 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Registrati con Google</span>
        </button>

        <ToggleAuthMode
          text="Hai già un profilo?"
          linkText="Accedi"
          to="/mindt-login"
        />
      </form>
    </RegisterLoginWrapper>
  );
};

export default Register;
