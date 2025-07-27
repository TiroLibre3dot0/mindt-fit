// src/components/Mindt/Shop/ShopPage.jsx
import React from "react";

const snacks = [
  {
    id: 1,
    name: "Snack 1 - Focus Bar",
    image: "/Snacks/snack1.png",
    price: "$3.49",
    rating: 5,
  },
  {
    id: 2,
    name: "Snack 2 - Calm Bar",
    image: "/Snacks/snack2.png",
    price: "$3.49",
    rating: 5,
  },
  {
    id: 3,
    name: "Snack 3 - Energy Shot",
    image: "/Snacks/snack3.png",
    price: "$2.99",
    rating: 5,
  },
];

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">
      
      {/* Hero principale */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center relative">
        {/* Sfondo circolare */}
        <div className="absolute w-[320px] h-[320px] rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>

        <img src="/Snacks/snack1.png" alt="Snack Hero" className="h-64 object-contain relative z-10" />

        <h1 className="text-4xl font-extrabold mt-8 z-10">New Mindt Snacks</h1>
        <p className="text-gray-300 mt-2 max-w-md z-10">Focus, relax, energy: unlock your mental balance with every bite.</p>
        <button className="mt-4 bg-red-600 px-6 py-2 text-white font-semibold rounded-lg hover:bg-red-700 transition z-10">
          Order Now
        </button>

        {/* Icone laterali (solo desktop) */}
        <div className="hidden lg:flex flex-col gap-4 absolute right-10 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="focus">🧠</span>
            <span>Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <span role="img" aria-label="calm">😌</span>
            <span>Calm</span>
          </div>
          <div className="flex items-center gap-2">
            <span role="img" aria-label="energy">⚡</span>
            <span>Energy</span>
          </div>
        </div>
      </div>

      {/* Lista snack */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20 max-w-6xl mx-auto">
        {snacks.map((snack) => (
          <div key={snack.id} className="bg-[#1c1c1c] rounded-2xl p-6 text-center shadow-md hover:scale-[1.02] transition">
            <img src={snack.image} alt={snack.name} className="h-40 object-contain mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-1">{snack.name}</h2>
            <p className="text-red-400 text-lg font-bold">{snack.price}</p>
            <div className="text-yellow-400 my-2 text-sm">
              {"★".repeat(snack.rating)}{"☆".repeat(5 - snack.rating)}
            </div>
            <button className="bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
