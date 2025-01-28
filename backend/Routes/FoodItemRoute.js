const express = require("express");
const router = express.Router();
const food_items = require("../models/FoodItems");
const Category = require("../models/FoodCategory");

router.get("/foodData", async (req, res) => {
  try {
    const foodData = await food_items.find();
    res.json(foodData);
  } catch (err) {
    res.status(500).json({ error: `An error occurred ${err}` });
  }
});

// Create a new endpoint to handle the data sent from the frontend
router.post("/handleFoodData", async (req, res) => {
  try {
    // You can access the data sent from the frontend in req.body
    const requestData = req.body;
    console.log(requestData);

    // Perform any necessary actions with the data
    // For example, you can save it to your MongoDB using Mongoose
    const newFoodItem = new food_items({
      CategoryName: requestData.category,
      name: requestData.productName,
      img: requestData.url,
      options: { [requestData.options]: requestData.price },
      description: requestData.description,
    });

    await newFoodItem.save();

    res.json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: `An error occurred ${err}`  });
  }
});

router.post("/category", async (req, res) => {
  try {
    const { CategoryName } = req.body; // Extract the "CategoryName" from the request body

    if (!CategoryName) {
      return res.status(400).json({ error: "CategoryName is required" });
    }

    const newCategory = new Category({ CategoryName });
    await newCategory.save();
    res.json({ success: true, category: newCategory });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: `An error occurred ${err}`  });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: `An error occurred ${err}`  });
  }
});

module.exports = router;
