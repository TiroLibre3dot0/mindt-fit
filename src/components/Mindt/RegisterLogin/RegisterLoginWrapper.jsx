import React, { useEffect, useState } from "react";

const RegisterLoginWrapper = ({ children }) => {
  const [snack, setSnack] = useState(1);

  useEffect(() => {
    const random = Math.floor(Math.random() * 6) + 1;
    setSnack(random);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#3e2f28] via-[#5a3f33] to-[#2e1d1b] flex items-center justify-center relative overflow-hidden">
      
      {/* Sfondo con immagine snack */}
      <div
        className="absolute inset-0 bg-no-repeat opacity-60 pointer-events-none transition-all duration-500"
        style={{
          backgroundImage: `url('/Snackspeople/snackpeople${snack}.png')`,
          backgroundSize: "30%",
          backgroundPosition: "right bottom",
        }}
      />

      {/* Filtro leggero radiale per migliorare contrasto testo */}
      <div className="absolute inset-0 bg-gradient-radial from-black/20 via-transparent to-black/10 z-0" />

      {/* Contenitore del form */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 z-10">
        {children}
      </div>
    </div>
  );
};

export default RegisterLoginWrapper;
