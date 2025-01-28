const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;
    order_data.unshift({ Order_date: order_date }); // Add Order_date at the beginning

    // Use upsert to create or update the document in one operation
    await Order.findOneAndUpdate(
      { email },
      { $push: { order_data } },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: "Server Error" });
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;
    const eId = await Order.findOne({ email });

    if (!eId) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.json({ orderData: eId });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ success: false, message: "Error retrieving order data" });
  }
});

module.exports = router;
