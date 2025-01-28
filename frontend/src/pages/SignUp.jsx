import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const onChangeData = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", {
        name: credential.name,
        email: credential.email,
        password: credential.password,
        location: credential.geolocation,
      });
      toast.success("Success!", {
        duration: 3000,
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Loop through each error and show a toast for each
        if (Array.isArray(error.response.data.errors)) {
          error.response.data.errors.forEach((err) => {
            toast.error(err.message, {
              duration: 3000,
            });
          });
        } else {
          toast.error(error.response.data.errors, {
            duration: 3000,
          });
        }
      } else {
        toast.error("An unexpected error occurred.", {
          duration: 3000,
        });
      }
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={credential.name}
                onChange={onChangeData}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credential.email}
                onChange={onChangeData}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your email"
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credential.password}
                onChange={onChangeData}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="geolocation"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="geolocation"
                name="geolocation"
                value={credential.geolocation}
                onChange={onChangeData}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter your address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              Sign Up
            </button>

            <div className="flex justify-center items-center mt-4">
              <p className="text-sm text-gray-600">
                Already a user?{" "}
                <Link
                  to="/login"
                  className="text-violet-600 hover:text-violet-700 font-semibold"
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
