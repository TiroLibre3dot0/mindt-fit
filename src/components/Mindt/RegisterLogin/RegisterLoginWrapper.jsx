import React, { useEffect, useState } from "react";

const RegisterLoginWrapper = ({ children }) => {
  const [snack, setSnack] = useState(1);

  useEffect(() => {
    const random = Math.floor(Math.random() * 6) + 1;
    setSnack(random);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#3e2f28] via-[#5a3f33] to-[#2e1d1b] flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-contain bg-right-bottom opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('/Snacks/snack${snack}.png')`,
        }}
      />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 z-10">
        {children}
      </div>
    </div>
  );
};

export default RegisterLoginWrapper;
