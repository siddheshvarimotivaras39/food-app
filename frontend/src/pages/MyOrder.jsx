import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    const response = await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    const data = await response.json();
    setOrderData(data.orderData);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Check if orderData is available */}
          {Object.keys(orderData).length !== 0 && orderData.order_data ? (
            orderData.order_data
              .slice(0)
              .reverse()
              .map((order, index) => (
                <div key={index} className="space-y-4">
                  {order.map((arrayData, idx) => {
                    return arrayData.Order_date ? (
                      <div
                        key={idx}
                        className="text-lg font-semibold text-center text-gray-700 border-b pb-2"
                      >
                        Order Date: {arrayData.Order_date}
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                      >
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {arrayData.name}
                          </h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-600">
                              Qty: {arrayData.qty}
                            </span>
                            <span className="text-sm text-gray-600">
                              Size: {arrayData.size}
                            </span>
                          </div>
                          <div className="text-gray-700 mt-2">
                            <span className="font-bold">Price:</span> Rs{" "}
                            {arrayData.price}/-
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
