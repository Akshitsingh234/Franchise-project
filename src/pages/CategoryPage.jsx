import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [franchises, setFranchises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/franchises/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setFranchises(data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-900 opacity-30 -z-10"></div>

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Franchises in{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {categoryName.replace("-", " ").toUpperCase()}
          </span>
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          Explore franchise opportunities available in this category.
        </p>
      </div>

      {/* Franchise Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {franchises.length === 0 ? (
          <p className="col-span-full text-center text-gray-400 text-lg">
            No franchises found.
          </p>
        ) : (
          franchises.map((franchise) => (
            <div
              key={franchise.id}
              onClick={() => navigate(`/franchise/${franchise.id}`)}
              className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
            >
              {/* Icon */}
              <div className="h-40 bg-white/20 flex items-center justify-center rounded-t-2xl">
                <Building className="w-12 h-12 text-indigo-300" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between h-48">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-indigo-300 transition">
                    {franchise.name}
                  </h2>
                  <p className="mt-3 text-gray-300 line-clamp-3">
                    {franchise.description}
                  </p>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-500 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
