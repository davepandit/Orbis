import React from "react";
import {
  FaTree,
  FaUsers,
  FaGamepad,
  FaRobot,
  FaTheaterMasks,
  FaHeartbeat,
  FaFutbol,
  FaPaintBrush,
} from "react-icons/fa";

const categories = [
  {
    name: "Travel and Outdoor",
    icon: <FaTree className="text-green-700 text-2xl" />,
  },
  {
    name: "Social Activities",
    icon: <FaUsers className="text-purple-700 text-2xl" />,
  },
  {
    name: "Hobbies and Passions",
    icon: <FaPaintBrush className="text-yellow-600 text-2xl" />,
  },
  {
    name: "Sports and Fitness",
    icon: <FaFutbol className="text-cyan-700 text-2xl" />,
  },
  {
    name: "Health and Wellbeing",
    icon: <FaHeartbeat className="text-green-600 text-2xl" />,
  },
  { name: "Technology", icon: <FaRobot className="text-pink-800 text-2xl" /> },
  {
    name: "Art and Culture",
    icon: <FaTheaterMasks className="text-yellow-600 text-2xl" />,
  },
  { name: "Games", icon: <FaGamepad className="text-blue-600 text-2xl" /> },
];

const TopCategories = () => {
  return (
    <section className="mt-11 w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Explore top categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-11">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-[#f9fafa] p-6 rounded-lg flex flex-col items-center justify-center text-center hover:shadow-sm transition hover:cursor-pointer"
            >
              <div className="mb-3">{cat.icon}</div>
              <p className="text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
