"use client";
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ fullname: null, token: "" });

  useEffect(() => {
    // Check for user data in localStorage on the client-side
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");
      if (data) {
        const parseData = JSON.parse(data);
        setAuth({
          fullname: parseData.user.fullname,
          userId: parseData.user._id,
          email: parseData.user.email,
          phone: parseData.user.phone,
          token: parseData.token,
        });
      }
    }
  }, []);

  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
