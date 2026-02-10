const Transaction = require("../models/Transaction");

// ADD TRANSACTION
exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      userId: req.user.id,
      ...req.body
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TRANSACTION
exports.deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // 🔐 VERY IMPORTANT
    });

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};