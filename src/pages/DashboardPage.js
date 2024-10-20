import React, { useEffect, useState } from "react";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import UserDashboard from "../components/Dashboard/UserDashboard";
import axios from "axios";
import axiosInstance from "../config/axiosInstance";
import useAuth from "../hooks/useAuth";
const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user data from API
    axiosInstance
      .get("/users/get-me")
      .then((response) => setUser(response.data?.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {user.role === "ADMIN" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard user={user} />
      )}
  
    </div>
  );
};

export default DashboardPage;
