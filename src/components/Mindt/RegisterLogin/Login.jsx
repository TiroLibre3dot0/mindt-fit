import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import ToggleAuthMode from "./ToggleAuthMode";
import { useAuth } from "./useAuth";
import { FcGoogle } from "react-icons/fc";
import RegisterLoginWrapper from "./RegisterLoginWrapper";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loginWithGoogleAccount } = useAuth();

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
    if (success) navigate("/mindt-dashboard");
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogleAccount();
    if (success) navigate("/mindt-dashboard");
  };

  return (
    <RegisterLoginWrapper>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Accedi al tuo profilo
        </h2>

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

        <AuthButton text="Accedi con Email" className="bg-[#f17b4e] hover:bg-[#e56733]" />

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-white/30 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Accedi con Google</span>
        </button>

        <ToggleAuthMode
          text="Non hai ancora un profilo?"
          linkText="Registrati"
          to="/mindt-register"
        />
      </form>
    </RegisterLoginWrapper>
  );
};

export default Login;
