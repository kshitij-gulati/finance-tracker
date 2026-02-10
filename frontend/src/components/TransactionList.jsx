import api from "../api/axios";
import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export default function TransactionList({ transactions, onDelete }) {
  const { refreshDashboard } = useContext(DashboardContext);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      // update dashboard
      refreshDashboard();

      // update transactions list
      onDelete(id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="flex justify-between items-center p-4 border-b"
        >
          <div>
            <p className="font-medium">{tx.category}</p>
            <p className="text-sm text-gray-500">{tx.type}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`font-bold ${
                tx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{tx.amount}
            </span>

            <button
              onClick={() => handleDelete(tx._id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}