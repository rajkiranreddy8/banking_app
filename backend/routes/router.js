const mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// User Models
let userSchema = require("../models/User");
let MoneySchema = require("../models/TransferMoney");

// CREATE user
router.post("/create-user", async (req, res, next) => {
  try {
    const user = await userSchema.create(req.body);
    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    next(error);
  }
});

// Create transactions
router.post("/create-transaction", async (req, res) => {
  const { name1, name2, amount } = req.body;
  try {
    const fromCustomer = await userSchema.findOne({ name: name1 });
    const toCustomer = await userSchema.findOne({ name: name2 });

    if (!fromCustomer || !toCustomer) {
      return res.status(404).send("User not found");
    }

    // Check for sufficient balance
    if (fromCustomer.amount < Number(amount)) {
      return res.status(400).send("Insufficient balance");
    }

    // Update balances
    fromCustomer.amount -= Number(amount);
    toCustomer.amount += Number(amount);

    await fromCustomer.save();
    await toCustomer.save();

    // Save transaction
    const transaction = new MoneySchema({
      name1,
      name2,
      amount,
    });
    await transaction.save();
    res.json({ message: "Transaction successful", transaction });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// READ all users
router.get("/", async (req, res) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Read Transactions
router.get("/transaction-history", async (req, res) => {
  try {
    const transactions = await MoneySchema.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE user by ID
router.delete("/delete-user/:id", async (req, res, next) => {
  try {
    console.log("User ID to delete:", req.params.id);
    const user = await userSchema.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server Error");
  }
});

// Get user by ID
router.get("/user/:id", async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
