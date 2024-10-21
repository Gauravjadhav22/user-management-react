import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const UserDashboard = ({ user,updateUser=()=>{} }) => {
  const [isDisabled, setIsDisabled] = useState(user.isDisabled);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  console.log(user);

  const toggleDisable = async () => {
    setIsDisabled(!isDisabled);
    try {
      await axiosInstance.put(`/users/disable/${user.id}`, {
        disable: !isDisabled,
      });
      toast.success("updated successfully");
      updateUser()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!..");

      console.error("Error toggling user:", error);
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/users/${user.id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!..");

      console.error("Error deleting user:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/users/${user.id}`, updatedUser);
      setShowEditForm(false);
      toast.success("updated successfully");
      updateUser()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!..");

      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="relative w-full">
    {showEditForm && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-1/2 lg:w-1/3">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleEditSubmit}>
        <label className="block mb-2">First Name:</label>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          value={updatedUser.firstName}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, firstName: e.target.value })
          }
        />
        <label className="block mb-2">Last Name:</label>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          value={updatedUser.lastName}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, lastName: e.target.value })
          }
        />
        <label className="block mb-2">Email:</label>
        <input
          className="border p-2 mb-4 w-full"
          type="email"
          value={updatedUser.email}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, email: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}


      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {user.firstName}
              </h1>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>
            <button
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FiMoreVertical size={24} />
              {showMoreOptions && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                  <ul className="py-1 text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 flex items-center"
                      onClick={handleEdit}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 flex items-center text-red-500"
                      onClick={handleDelete}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              User Information
            </h2>
            <p className="text-gray-600">First Name: {user.firstName}</p>
            <p className="text-gray-600">Last Name: {user.lastName}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={toggleDisable}
              className={`w-full py-2 px-4 rounded-lg text-white focus:outline-none transition-all 
              ${
                isDisabled
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isDisabled ? "Enable Account" : "Disable Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
