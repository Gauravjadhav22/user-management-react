import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import EditUserForm from "./EditUserForm";

const UserCard = ({ user, isAdmin = false, onUserUpdated, onUserDeleted }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(user.disabled); // Initialize with user's current disabled state

  const toggleDisable = async () => {
    setIsDisabled(!isDisabled); // Toggle local state for UI update
    try {
      await axiosInstance.put(`/users/disable/${user.id}`, {
        disable: !isDisabled,
      });
      toast.success(
        `Account ${isDisabled ? "enabled" : "disabled"} successfully!`
      );
      onUserUpdated(); // Optional: Refresh user list
    } catch (error) {
      console.error("Error toggling user:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!..");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMoreOptions(false); // Close the options menu
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/users/${user.id}`);
        toast.success("User deleted successfully!");
        onUserDeleted(user.id); // Notify parent to update state
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(
          error?.response?.data?.message || "Something went wrong!.."
        );
      } finally {
        setShowMoreOptions(false); // Close the options menu
      }
    }
  };
  return (
    <div
      className={` bg-white shadow-lg rounded-lg p-6 w-full max-w-md transition-all 
      ${
        isAdmin
          ? "ml-20 border-2 shadow-sm border-blue-500 scale-125 m-52 shadow-white"
          : "border border-gray-200 shadow-sm shadow-white"
      }`}
    >
      <div
        className={`flex sm:flex-row  ${
          isAdmin && "flex-col"
        } items-center justify-between mb-4`}
      >
        <img
          src={user?.avatar}
          className="w-24"
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500">Email: {user.email}</p>
          <p className="text-sm text-gray-500">Phone: {user.phone}</p>
          <p className="text-sm text-gray-500 ">
            Role: <span className="font-bold">{user.role}</span>
          </p>
        </div>
        <button
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FiMoreVertical size={24} />
          {showMoreOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <ul className="py-1 text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                  onClick={handleEdit}
                >
                  <FaEdit className="mr-2" /> Edit
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 flex items-center text-red-500 cursor-pointer"
                  onClick={handleDelete}
                >
                  <FaTrash className="mr-2" /> Delete
                </li>
              </ul>
            </div>
          )}
        </button>
      </div>

      {isEditing ? (
        <EditUserForm
          user={user}
          onClose={() => setIsEditing(false)}
          onUserUpdated={onUserUpdated}
        />
      ) : (
        <div className="mt-6">
          <button
            onClick={toggleDisable}
            className={`w-full py-2 px-4 rounded-lg text-white focus:outline-none transition-all 
            ${
              user?.disable
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {user?.disable ? "Enable Account" : "Disable Account"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
