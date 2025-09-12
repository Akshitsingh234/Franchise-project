// AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) {
      // Try to validate JWT expiry if token appears to be a JWT
      const parts = savedToken.split(".");
      if (parts.length === 3) {
        try {
          const payloadBase64Url = parts[1];
          // Convert base64url to base64 and add padding if needed
          const base64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
          const padded = base64 + "===".slice((base64.length + 3) % 4);
          const decoded = typeof atob === "function" ? atob(padded) : window.atob(padded);
          const payloadJson = JSON.parse(decoded);
          if (payloadJson && payloadJson.exp && Date.now() >= payloadJson.exp * 1000) {
            localStorage.removeItem("jwtToken");
          } else {
            setToken(savedToken);
          }
        } catch {
          // If parsing fails, treat as opaque token
          setToken(savedToken);
        }
      } else {
        // If token is not a JWT, just set it
        setToken(savedToken);
      }
    }
    setLoading(false);
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem("jwtToken", jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
