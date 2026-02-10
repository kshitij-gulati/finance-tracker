import { useState, useContext } from "react";
import api from "../api/axios";
import { CATEGORIES } from "../constants/categories";
import { DashboardContext } from "../context/DashboardContext";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const { refreshDashboard } = useContext(DashboardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/transactions", {
      type,
      amount: Number(amount),
      category,
    });

    // 🔥 THIS IS THE KEY LINE
    refreshDashboard();

    // refresh transaction list
    onAdd();

    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded font-semibold ${
            type === "income"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          + Add Income
        </button>

        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded font-semibold ${
            type === "expense"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          − Add Expense
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          className="w-full border rounded px-4 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-4 py-2"
          required
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold text-white ${
            type === "income" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          Save {type === "income" ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
}