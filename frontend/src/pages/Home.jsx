import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const loadData = async () => {
    try {
      const foodDataResponse = await fetch(
        "http://localhost:5000/api/foodData"
      );
      const foodDataJson = await foodDataResponse.json();
      setFoodData(foodDataJson);

      const foodCatResponse = await fetch(
        "http://localhost:5000/api/categories"
      );
      const foodCatJson = await foodCatResponse.json();
      setFoodCat(foodCatJson.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <input
            className="w-2/3 md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <img
            src={`https://picsum.photos/800/400?`}
            alt="bg"
            className="w-full h-64 object-cover brightness-75"
          />
        </div>
      </div>

      <div className="container mx-auto my-8 px-4">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category?._id} className="mb-8">
              <h2 className="text-xl font-bold mb-4">
                {category?.CategoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {foodData
                  .filter(
                    (item) =>
                      item?.CategoryName === category?.CategoryName &&
                      item?.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <Card
                      key={filteredItem?._id}
                      foodItem={filteredItem}
                      options={filteredItem.options[0]}
                    />
                  ))}
              </div>
              {foodData.filter(
                (item) =>
                  item?.CategoryName === category?.CategoryName &&
                  item?.name.toLowerCase().includes(search.toLowerCase())
              ).length === 0 && <p className="text-gray-500">No data found.</p>}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
