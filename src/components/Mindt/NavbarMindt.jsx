// src/components/Mindt/NavbarMindt.jsx

import React, { useEffect, useRef, useState } from "react";
import { CTA_COLORS } from "./StartButton";
import { useLanguage } from "../../context/LanguageContext";
import Flag from "react-world-flags";

export default function NavbarMindt({
  items = [
    { id: "Mindt", label: "Mindt", href: "/" },
    { id: "shop", label: "Shop", href: "/shop" },
    { id: "signin", label: "Sign in", href: "/mindt-register" },
  ],
  activeId,
  onNavigate,
  highlightColors, // ✅ aggiunto
}) {

  const [internalActive, setInternalActive] = useState(items[0]?.id || "");
  const active = activeId ?? internalActive;
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);

  const { language, setLanguage } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const availableLangs = ["it", "en", "es"];

  const [colors, setColors] = useState({ color: "", hover: "" });
  useEffect(() => {
  if (highlightColors) {
    setColors(highlightColors);
  } else {
    const idx = Math.floor(Math.random() * CTA_COLORS.length);
    setColors({ color: CTA_COLORS[idx].color, hover: CTA_COLORS[idx].hover });
  }
}, [highlightColors]);

  useEffect(() => {
    const update = () => {
      const index = items.findIndex((item) => item.id === active);
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
  }, [active, items]);

  const handleClick = (e, item) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item);
    }
    setInternalActive(item.id);
  };

  return (
    <nav
      ref={navRef}
      className="relative flex flex-wrap items-center justify-center gap-3 px-4 py-2 bg-[#173f47] text-gray-300 rounded-2xl shadow-md"
    >
      {/* INDICATORE ANIMATO */}
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

      {/* VOCI DI MENU */}
      {items.map((item, idx) => (
        <a
          key={item.id}
          href={item.href}
          ref={(el) => (itemRefs.current[idx] = el)}
          onClick={(e) => handleClick(e, item)}
          className={`relative z-10 px-4 py-2 font-medium transition-colors duration-300 ${
            active === item.id
              ? "text-white"
              : "text-gray-400 hover:text-gray-100"
          }`}
        >
          {item.label}
        </a>
      ))}

      {/* SELETTORE LINGUA A DESTRA */}
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
