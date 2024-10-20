import React, { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';

const EditUserForm = ({ user, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    disabled: user.disabled,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/users/${user.id}`, formData);
      toast.success("User updated successfully!");
      onUserUpdated(); 
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!..");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit" className="w-full py-2 mt-4 rounded-lg bg-blue-500 text-white">
        Update User
      </button>
      <button type="button" onClick={onClose} className="w-full py-2 mt-2 rounded-lg bg-gray-500 text-white">
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
