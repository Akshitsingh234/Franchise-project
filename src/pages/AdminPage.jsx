import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [franchiseForm, setFranchiseForm] = useState({
    name: "",
    description: "",
    investment: "",
    land: "",
    student: "",
    requirements: "",
  });

  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/category/all")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((res) => res.json())
      .then((cat) => {
        setCategories([...categories, cat]);
        setNewCategory("");
      });
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout API failed:", err);
    }
    logout();
    navigate("/admin-login");
  };

  const handleDeleteCategory = (id) => {
    fetch(`http://localhost:8080/api/category/${id}`, { method: "DELETE" })
      .then(() => setCategories(categories.filter((c) => c.id !== id)));
  };

  const openFranchiseModal = (cat) => {
    setSelectedCategory(cat);
    setFranchiseForm({
      name: "",
      description: "",
      investment: "",
      land: "",
      student: "",
      requirements: "",
    });
  };

  const handleAddFranchise = () => {
    if (
      !franchiseForm.name ||
      !franchiseForm.description ||
      !franchiseForm.investment ||
      !franchiseForm.land ||
      !franchiseForm.student ||
      !franchiseForm.requirements
    ) {
      return alert("Please fill out all franchise fields!");
    }

    const encodedName = encodeURIComponent(selectedCategory.name);
    fetch(`http://localhost:8080/api/franchises/add/${encodedName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(franchiseForm),
    })
      .then((res) => res.json())
      .then((fr) => {
        setCategories(
          categories.map((c) =>
            c.id === selectedCategory.id
              ? { ...c, franchises: [...(c.franchises || []), fr] }
              : c
          )
        );
        setSelectedCategory(null);
      });
  };

  const handleDeleteFranchise = (catId, franchiseId) => {
    fetch(`http://localhost:8080/api/franchises/${franchiseId}`, {
      method: "DELETE",
    }).then(() => {
      setCategories(
        categories.map((c) =>
          c.id === catId
            ? {
                ...c,
                franchises: (c.franchises || []).filter(
                  (f) => f.id !== franchiseId
                ),
              }
            : c
        )
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-400">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/userList")}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg shadow hover:bg-sky-600 transition"
          >
            Users
          </button>
          <button
            onClick={handleLogout}
            className="bg-rose-500 text-white px-4 py-2 rounded-lg shadow hover:bg-rose-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Category */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-700/70 backdrop-blur-md rounded-2xl p-10 w-full max-w-2xl shadow-lg border border-blue-700 transition-all duration-300 
    transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-300">
            Add New Category
          </h2>
          <div className="flex gap-4">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name..."
              className="border p-3 rounded-lg w-full text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleAddCategory}
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-gray-700/70 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between h-60 transition-all duration-300 
    transform hover:-translate-y-2"
          >
            <div>
              <h2 className="text-lg font-semibold text-indigo-300 mb-3">{cat.name}</h2>
              <ul className="space-y-2 overflow-y-auto max-h-28 pr-2">
                {cat.franchises &&
                  cat.franchises.map((f) => (
                    <li
                      key={f.id}
                      className="flex justify-between items-center bg-gray-700/50 px-2 py-1 rounded text-sm"
                    >
                      <span className="truncate">
                        <strong>{f.name}</strong>
                      </span>
                      <button
                        onClick={() => handleDeleteFranchise(cat.id, f.id)}
                        className="bg-rose-400 text-white px-2 py-0.5 rounded text-xs hover:bg-rose-500 transition"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => openFranchiseModal(cat)}
                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm transition"
              >
                Add Franchise
              </button>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600 text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Franchise Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white/20 backdrop-blur-md p-6 w-full max-w-lg rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-indigo-300">
              Add Franchise to {selectedCategory.name}
            </h2>
            <div className="space-y-3">
              {["name", "description", "investment", "land", "student", "requirements"].map(
                (field) => (
                  <input
                    key={field}
                    value={franchiseForm[field]}
                    onChange={(e) =>
                      setFranchiseForm({ ...franchiseForm, [field]: e.target.value })
                    }
                    placeholder={`Franchise ${field}`}
                    className="border w-full p-2 rounded bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                )
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFranchise}
                className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition"
              >
                Save Franchise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
