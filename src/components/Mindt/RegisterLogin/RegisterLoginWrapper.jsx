import React, { useEffect, useState } from "react";
import { useBurnout } from "../../../context/BurnoutContext";
import { getColorPalette } from "../../../utils/burnoutColors";

const RegisterLoginWrapper = ({
  children,
  showSnackImage = true,
  maxWidth = "md",
  align = "center",
}) => {
  const [snack, setSnack] = useState(1);
  const { burnoutLevel } = useBurnout();
  const palette = getColorPalette(burnoutLevel);

  useEffect(() => {
    const random = Math.floor(Math.random() * 6) + 1;
    setSnack(random);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-all duration-500"
      style={{
        background: `linear-gradient(to bottom, ${palette.main}, ${palette.light})`,
      }}
    >
      {/* Snack Image (disattivabile con prop) */}
      {showSnackImage && (
        <div
          className="absolute inset-0 bg-no-repeat opacity-70 pointer-events-none z-0 transition-all duration-500"
          style={{
            backgroundImage: `url('/Snackspeople/snackpeople${snack}.png')`,
            backgroundSize: "25%",
            backgroundPosition: "right bottom",
          }}
        />
      )}

      {/* Filtro leggero per migliorare leggibilità testo */}
      <div className="absolute inset-0 bg-gradient-radial from-black/20 via-transparent to-black/10 z-0" />

      {/* Form */}
      <div
        className={`w-full max-w-${maxWidth} ${
          align === "left" ? "ml-10" : ""
        } bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 z-10`}
      >
        {children}
      </div>
    </div>
  );
};

export default RegisterLoginWrapper;
