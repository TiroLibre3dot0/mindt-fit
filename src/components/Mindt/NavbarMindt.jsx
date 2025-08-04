// src/components/Mindt/NavbarMindt.jsx

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getColorPalette } from "../../utils/burnoutColors";
import { useAuthContext } from "../../context/AuthContext";
import { useBurnout } from "../../context/BurnoutContext";
import { CTA_COLORS } from "./StartButton";
import { useLanguage } from "../../context/LanguageContext";
import Flag from "react-world-flags";

export default function NavbarMindt({ highlightColors }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { burnoutLevel } = useBurnout();
  const { language, setLanguage } = useLanguage();

  const isDashboard = location.pathname === "/mindt-dashboard";
  if (isDashboard) return null;

  // 🌍 Lingue disponibili
  const availableLangs = ["it", "en", "es"];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // 🎨 Colori dinamici
  const [colors, setColors] = useState({ color: "", hover: "" });
  useEffect(() => {
    if (highlightColors) {
      setColors(highlightColors);
    } else if (burnoutLevel) {
      setColors(getColorPalette(burnoutLevel));
    } else {
      const idx = Math.floor(Math.random() * CTA_COLORS.length);
      setColors({ color: CTA_COLORS[idx].color, hover: CTA_COLORS[idx].hover });
    }
  }, [highlightColors, burnoutLevel]);

  // 🔗 Link dinamici
  const slug = user?.displayName?.toLowerCase().replace(/\s+/g, "-");
  const items = [
    { id: "Mindt", label: "Mindt", href: "/" },
    { id: "shop", label: "Shop", href: "/shop" },
    ...(user
      ? [
          { id: "profile", label: "Profilo", href: `/mindt-profilo/${slug}` },
          { id: "logout", label: "Logout", href: "#" },
        ]
      : [{ id: "signin", label: "Sign in", href: "/mindt-register" }]),
  ];

  // 📍 Determinazione dinamica voce attiva
  const getActiveId = () => {
    const path = location.pathname;
    if (path === "/" || path.startsWith("/home")) return "Mindt";
    if (path.startsWith("/shop")) return "shop";
    if (path.startsWith("/mindt-profilo") || path.startsWith("/userprofile")) return "profile";
    if (path.startsWith("/mindt-register") || path.startsWith("/mindt-login")) return "signin";
    return "";
  };

  const activeId = getActiveId();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);

  // 🟨 Aggiornamento animazione indicatore
  useEffect(() => {
    const update = () => {
      const index = items.findIndex((item) => item.id === activeId);
      const el = itemRefs.current[index];
      if (!el || !navRef.current || !indicatorRef.current) return;

      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      const offsetLeft = itemRect.left - navRect.left;
      const offsetTop = itemRect.top - navRect.top;

      indicatorRef.current.style.width = `${itemRect.width}px`;
      indicatorRef.current.style.height = `${itemRect.height}px`;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.top = `${offsetTop}px`;
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeId, items]);

  const handleClick = (e, item) => {
    e.preventDefault();

    if (item.id === "logout") {
      logout().then(() => navigate("/"));
    } else {
      navigate(item.href);
    }
  };

  return (
    <nav
      ref={navRef}
      className="relative flex flex-wrap items-center justify-center gap-3 px-4 py-2 bg-[#173f47] text-gray-300 rounded-2xl shadow-md"
    >
      {/* 🔸 Indicatore attivo */}
      <span
        ref={indicatorRef}
        className="absolute left-0 rounded-lg transition-all duration-300 pointer-events-none"
        style={{
          width: 0,
          height: 0,
          transform: "translateX(0)",
          top: 0,
          transitionTimingFunction: "cubic-bezier(0.32, 1.56, 0.64, 1)",
          background: `linear-gradient(to right, ${colors.color}, ${colors.hover})`,
        }}
      />

      {/* 🔗 Voci di menu */}
      {items.map((item, idx) => (
        <a
          key={item.id}
          href={item.href}
          ref={(el) => (itemRefs.current[idx] = el)}
          onClick={(e) => handleClick(e, item)}
          className={`relative z-10 px-4 py-2 font-medium transition-colors duration-300 ${
            activeId === item.id ? "text-white" : "text-gray-400 hover:text-gray-100"
          }`}
        >
          {item.label}
        </a>
      ))}

      {/* 🌍 Selettore lingua */}
      <div className="relative z-10 ml-2">
        <button
          onClick={() => setLangMenuOpen((prev) => !prev)}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#224344] transition"
        >
          <Flag code={language} style={{ width: 20, height: 14, borderRadius: 2 }} />
          <span className="text-sm">▾</span>
        </button>

        {langMenuOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow z-50 w-28">
            {availableLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setLangMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
              >
                <Flag code={lang} style={{ width: 20, height: 14, borderRadius: 2 }} />
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
