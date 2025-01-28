import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import toast, { Toaster } from "react-hot-toast";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const options = props.options;
  const priceOptions = Object.keys(options);

  const handleAddToCart = async () => {
    let food = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );
    const finalPrice = qty * parseInt(options[size]);

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty,
      });
      toast.success("Cart updated!", { duration: 1500 });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: props.foodItem.img,
      });
      toast.success("Added to cart!", { duration: 1500 });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <>
      <Toaster />
      <div className="rounded-lg shadow-md p-4 bg-white flex flex-col">
        <img
          src={props.foodItem.img}
          alt={props.foodItem.name}
          className="rounded-lg object-cover w-full h-48 mb-4"
        />
        <h5 className="text-lg font-semibold mb-2">{props.foodItem.name}</h5>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {props.foodItem.description}
        </p>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <select
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <div className="text-right text-lg font-semibold text-indigo-600">
            Rs {qty * parseInt(options[size])}/-
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
