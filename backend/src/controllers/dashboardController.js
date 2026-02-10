const Transaction = require("../models/Transaction");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Total Income
    const incomeAgg = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "income",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    console.log("incomeAgg:", incomeAgg);
    const totalIncome = incomeAgg[0]?.total || 0;

    // 2️⃣ Total Expense
    const expenseAgg = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpense = expenseAgg[0]?.total || 0;

    // 3️⃣ Expense by Category (for Pie Chart)
    const expenseByCategory = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          amount: 1,
        },
      },
    ]);

    // 4️⃣ Balance
    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
      expenseByCategory,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};