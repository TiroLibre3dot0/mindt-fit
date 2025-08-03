import React from "react";
import {
  FaHome,
  FaUser,
  FaCalendarCheck,
  FaRunning,
  FaSlidersH,
} from "react-icons/fa";

const Sidebar = () => (
  <nav className="bg-[#1f1f1f] text-white w-20 md:w-64 min-h-screen flex flex-col items-center md:items-start py-6 px-2 shadow-lg">
    <h1 className="hidden md:block text-xl font-bold mb-6">Mindt</h1>
    <ul className="space-y-6 w-full">
      <li className="flex items-center gap-3 text-sm md:text-base hover:text-orange-400 transition">
        <FaHome className="text-xl" />
        <span className="hidden md:inline">Home</span>
      </li>
      <li className="flex items-center gap-3 text-sm md:text-base hover:text-orange-400 transition">
        <FaUser className="text-xl" />
        <span className="hidden md:inline">Profile</span>
      </li>
      <li className="flex items-center gap-3 text-sm md:text-base hover:text-orange-400 transition">
        <FaCalendarCheck className="text-xl" />
        <span className="hidden md:inline">Schedule</span>
      </li>
      <li className="flex items-center gap-3 text-sm md:text-base hover:text-orange-400 transition">
        <FaRunning className="text-xl" />
        <span className="hidden md:inline">Activities</span>
      </li>
      <li className="flex items-center gap-3 text-sm md:text-base hover:text-orange-400 transition">
        <FaSlidersH className="text-xl" />
        <span className="hidden md:inline">Settings</span>
      </li>
    </ul>
  </nav>
);

const DashboardMindt = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#223] to-[#446]">
      <Sidebar />

      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow">
          <h2 className="text-lg font-semibold mb-2">Mental Battery</h2>
          <p className="text-sm">Status: Moderate ⚡</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow">
          <h2 className="text-lg font-semibold mb-2">Recommended Snack</h2>
          <p className="text-sm">Calm Bar - Ashwagandha, Camomilla, Zinco</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow">
          <h2 className="text-lg font-semibold mb-2">Today’s Insight</h2>
          <p className="text-sm italic">
            “Balance is not something you find, it’s something you create.”
          </p>
        </div>

        {/* Placeholder future content */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow">
          <h2 className="text-lg font-semibold mb-2">Progress Timeline</h2>
          <p className="text-sm">Coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardMindt;
