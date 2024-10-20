import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../UserCard/UserCard";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const { user } = useAuth();
  console.log(user);
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      console.log(response.data);
      setUsers(response.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!..");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleUserUpdated = () => {
    fetchUsers(); // Refresh the user list
  };

  const handleUserDeleted = (userId) => {
    setUsers(users.filter((user) => user.id !== userId)); // Update local state
  };

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchVal.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchVal.toLowerCase()) ||
          user.role.toUpperCase().includes(searchVal.toUpperCase()) ||
          user.email.toLowerCase().includes(searchVal.toLowerCase())
      )
    );
  }, [searchVal, users]);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="ml-8 mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-evenly gap-4 items-center flex-wrap">
        {filteredUsers
          ?.filter((itm) => itm.id === user?.id)
          ?.map((userItm) => (
            <UserCard
              onUserDeleted={handleUserDeleted}
              onUserUpdated={handleUserUpdated}
              key={userItm.id}
              user={userItm}
              isAdmin={userItm.id === user?.id}
            />
          ))}
        {filteredUsers
          ?.filter((itm) => itm.id != user?.id)
          ?.map((userItm) => (
            <UserCard
              onUserDeleted={handleUserDeleted}
              onUserUpdated={handleUserUpdated}
              key={userItm.id}
              user={userItm}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
