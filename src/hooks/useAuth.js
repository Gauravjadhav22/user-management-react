import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import axiosInstance from "../config/axiosInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        console.log(storedUser);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const userData = response.data?.data?.user;
      console.log(response.data?.data?.user);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response?.data.token);
      return response?.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };
  const getMe = async () => {
    try {
      const response = await axiosInstance.post("/users/get-me");
      const userData = response.data.user;
      console.log(response.data);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return response?.data?.user;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      //   await axiosInstance.post('/auth/logout'); // Call the backend to log out
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: user?true:false,
    getMe
  };
}
export default useAuth;
