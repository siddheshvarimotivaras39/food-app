import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-100 bg-opacity-20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 border border-gray-500">
        <div className="relative bg-white rounded-2xl shadow-xl w-11/12 md:w-4/5 lg:w-1/2 p-6 max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-800">Cart</h2>
            <button
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          {/* Content */}
          <div className="text-gray-700 max-h-[calc(80vh-120px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
};

export default Modal;
