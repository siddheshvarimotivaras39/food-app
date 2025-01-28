import React, { useState } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleBuyNow = async () => {
    setIsLoading(true);
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        total_price: totalPrice,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      toast.success("Purchase successful! Your order has been placed.", {
        duration: 1500,
      });
      dispatch({ type: "DROP" });
    } else {
      toast.error("Failed to place order. Please try again later.", {
        duration: 1500,
      });
    }
    setIsLoading(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  localStorage.setItem("total-price", totalPrice);

  return (
    <div>
      <Toaster />
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <h3>Total Price: {totalPrice}</h3>
          <button
            className="btn bg-success text-white mt-1"
            onClick={handleBuyNow}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
