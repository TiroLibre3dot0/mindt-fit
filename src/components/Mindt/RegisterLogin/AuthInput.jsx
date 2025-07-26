import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AuthInput = ({ type, placeholder, value, onChange, name }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <input
        type={isPassword && show ? "text" : type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required
        className="w-full p-3 mb-4 border border-white/30 bg-white/10 text-white rounded-xl placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      {isPassword && (
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      )}
    </div>
  );
};

export default AuthInput;
