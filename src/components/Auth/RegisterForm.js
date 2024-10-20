import React, { useState } from "react";
import axios from "axios";
import { Link, Router, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const PRESET = "catch_fugitive_preset";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwmm1r1ph/image/upload";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passcode: "",
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setImage(file);
    setImageUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET);

    try {
      setLoading(true);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);

      if (response?.status === 200) {
        console.log("Image upload response status:", response.status);
        toast.success("Image uploaded successfully.");
        setImageUrl(response.data.secure_url);
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      toast.error("Error uploading image: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (formData.phone?.length<10) {
    toast.error("enter 10 digit phone")
        return
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        ...formData,
        avatar: imageUrl,
      });
console.log(imageUrl);
      if (response.status === 201) {
        toast.success("User registered successfully");
        console.log("User registered successfully:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!..");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="text-gray-600" htmlFor="avatar">
              Upload Avatar
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            {loading && <p className="text-gray-500 mt-2">Uploading...</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              min={11}
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
              required
            />
            <br />
            <label>enter passcode below for creating admin account</label>
            <input
              type="passcode"
              name="passcode"
              placeholder="Passcode"
              value={formData.passcode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <p className="text-sm font-light text-gray-500 dark:text-gray-600">
            having account?{" "}
            <Link
              to={"/"}
              className="font-bold text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
