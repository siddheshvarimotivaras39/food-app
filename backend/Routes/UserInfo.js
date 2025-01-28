const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secKey = process.env.SECRET_KEY;

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      errorMsg: `${error.path}: ${error.msg}`,
    };
  },
});

router.post(
  "/signup",
  body("email").isEmail(),
  body("name", "Minimum 5 characters allowed").isLength({ min: 5 }),
  body("password", "Minimum 5 characters allowed").isLength({ min: 5 }),
  async (req, res) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((error) => {
        return {
          message: error.errorMsg,
        };
      });
      return res.status(400).json({ success: false, errors: formattedErrors });
    }

    const { email, name, password, location } = req.body;

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errors: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);

      // Create new user
      await User.create({
        name,
        password: secPassword,
        email,
        location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password", "Minimum 5 characters allowed").isLength({ min: 5 }),
  async (req, res) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((error) => {
        return {
          message: error.errorMsg,
        };
      });
      return res.status(400).json({ success: false, errors: formattedErrors });
    }

    const { email, password } = req.body;

    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      const pswCompare = await bcrypt.compare(password, userData.password);
      if (!pswCompare) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      const data = { user: { id: userData.id } };
      const authToken = jwt.sign(data, secKey);

      return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
