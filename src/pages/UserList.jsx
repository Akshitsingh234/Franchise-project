import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/AuthContext";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/users/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.contactTime) - new Date(a.contactTime)
        );
        setUsers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, [token]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading users...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 drop-shadow">
        Registered Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No users found yet 🚫
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
            {/* Table Header */}
            <thead className="bg-indigo-600 text-white text-left">
              <tr>
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Intent</th>
                <th className="py-4 px-6">Contact Time</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white">
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`transition hover:bg-indigo-50 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-6 font-medium text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-6 font-semibold text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{user.email}</td>
                  <td className="py-3 px-6 text-gray-600">{user.phone}</td>
                  <td className="py-3 px-6">{user.location}</td>
                  <td className="py-3 px-6">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                      {user.intent}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(user.contactTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
