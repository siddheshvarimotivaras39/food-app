import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold  hover:text-gray-300 transition"
        >
          Food Delivery
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => document.getElementById("navbarMenu").classList.toggle("hidden")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Menu */}
        <div
          id="navbarMenu"
          className="hidden md:flex space-x-6 items-center text-lg"
        >
          <Link
            to="/"
            className="hover:text-gray-300 transition"
          >
            Home
          </Link>

          {localStorage.getItem("authToken") && (
            <Link
              to="/myorder"
              className="hover:text-gray-300 transition"
            >
              My Orders
            </Link>
          )}

          {!localStorage.getItem("authToken") ? (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="bg-white text-violet-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-violet-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4 items-center">
              {/* Cart */}
              <div
                className="relative bg-white text-green-600 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                onClick={() => setCartView(true)}
              >
                My Cart
                <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {data.length || 0}
                </span>
              </div>

              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
