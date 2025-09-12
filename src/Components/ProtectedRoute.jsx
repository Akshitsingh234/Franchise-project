import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center mt-10">Checking session...</p>;
  }

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
