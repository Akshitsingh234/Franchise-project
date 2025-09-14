import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Building } from "lucide-react"; // Lucide icon instead of emoji
import Navbar from "../Components/Navbar.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-900 opacity-30 -z-10"></div>

      {/* Navbar */}
     

      {/* Hero Section */}
      <div className="text-center mt-12 mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Franchise Category
          </span>
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          Discover opportunities across multiple categories and find the perfect fit for you.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="flex-1 container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              No categories found.
            </p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() =>
                  navigate(`/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`)
                }
                className="cursor-pointer bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center p-8"
              >
                <div className="w-20 h-20 mb-6 flex items-center justify-center bg-white/20 rounded-full">
                  <Building className="w-10 h-10 text-indigo-300" />
                </div>
                <h2 className="text-2xl font-semibold text-center group-hover:text-indigo-300 transition">
                  {cat.name}
                </h2>
                <p className="mt-3 text-gray-300 text-center line-clamp-3">
                  Explore the best opportunities in {cat.name}.
                </p>
                <button className="mt-6 w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition">
                  View Category
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
