import React, { useEffect, useState } from "react";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import UserDashboard from "../components/Dashboard/UserDashboard";
import axios from "axios";
import axiosInstance from "../config/axiosInstance";
import useAuth from "../hooks/useAuth";
const DashboardPage = () => {
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/users/get-me");
      setUser(response.data?.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {user.role === "ADMIN" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard user={user} updateUser={fetchCurrentUser}/>
      )}
  
    </div>
  );
};

export default DashboardPage;
