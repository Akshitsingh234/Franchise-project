import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, DollarSign, MapPin, Users, ClipboardList } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function FranchiseDetails() {
  const { id } = useParams();
  const [franchise, setFranchise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/franchises/id/${id}`)
      .then((res) => res.json())
      .then(setFranchise)
      .catch((err) => console.error(err));
  }, [id]);

  if (!franchise) return <p className="p-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-800 text-white py-12 px-6">
      {/* Hero Section */}
      <div className="bg-indigo-700/80 text-white py-16 px-6 text-center shadow-lg rounded-2xl transform transition hover:scale-105 duration-300 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">{franchise.name}</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          {franchise.tagline || "Discover a successful franchise opportunity with us."}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto py-12 space-y-8">
        {/* About */}
        <div className="bg-gray-700 p-8 rounded-2xl shadow-lg transform transition hover:scale-105 duration-300">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Building2 className="text-indigo-300 w-7 h-7" /> About the Franchise
          </h2>
          <p className="text-gray-200 leading-relaxed">{franchise.description}</p>
        </div>

        {/* Investment + Land + Capacity */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-2xl shadow-lg transform transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <DollarSign className="text-green-400 w-6 h-6" /> Investment
            </h2>
            <p className="text-gray-200">{franchise.investment}</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-2xl shadow-lg transform transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <MapPin className="text-red-400 w-6 h-6" /> Land Requirement
            </h2>
            <p className="text-gray-200">{franchise.land}</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-2xl shadow-lg transform transition hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
              <Users className="text-blue-400 w-6 h-6" /> Capacity
            </h2>
            <p className="text-gray-200">
              Suitable for <strong>{franchise.students}</strong> students/customers.
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-gray-700 p-8 rounded-2xl shadow-lg transform transition hover:scale-105 duration-300">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-3">
            <ClipboardList className="text-purple-400 w-6 h-6" /> Requirements
          </h2>
          <p className="text-gray-200">{franchise.requirements}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 py-6 shadow-lg mt-12 rounded-2xl max-w-5xl mx-auto transform transition hover:scale-105 duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6">
          <h2 className="text-xl font-semibold text-white">Ready to Apply for {franchise.name}?</h2>
          <button
            onClick={() => navigate(`/register`)}
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
