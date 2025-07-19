// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const nav = [
    { label: "Dashboard", path: "/", icon: "📊" },
    { label: "Startup Builder", path: "/startup-builder", icon: "🚀" },

    {
      label: "Mindt Panel",
      icon: "🧠",
      children: [
        { label: "Mindt Home", path: "/Mindt" },
        { label: "Mindt Admin", path: "/Mindt-admin" },
      ],
    },

    {
      label: "TiroLibre Panel",
      icon: "⚙️",
      children: [
        { label: "TiroLibre Home", path: "/tirolibre-entry" },
        { label: "TiroLibre Admin", path: "/tlpanel" },
      ],
    },
  ];

  return (
    <aside className="hidden md:block w-64 bg-zinc-900 h-screen p-6 text-white">
      <h1 className="text-xl font-bold mb-8">VisionaryOS</h1>
      <nav className="space-y-2">
        {nav.map((item) =>
          item.children ? (
            <div key={item.label}>
              <div className="flex items-center space-x-2 text-zinc-400 font-medium mb-1">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <div className="ml-5 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`block px-4 py-2 rounded-lg transition text-sm ${
                      location.pathname === child.path
                        ? "bg-zinc-700 text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
