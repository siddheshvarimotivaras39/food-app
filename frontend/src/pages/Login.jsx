import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChangeData = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: credential.email,
        password: credential.password,
      });
      toast.success("Success!", {
        duration: 1500,
      });
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.errors) {
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
    <div>
      <Toaster />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
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
            </div>

            <div className="mb-6">
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

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              Log In
            </button>

            <div className="flex justify-center items-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-violet-600 hover:text-violet-700 font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
