import { useContext, useEffect } from "react";
import { DashboardContext } from "../context/DashboardContext";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/ExpenseCategoryChart";

export default function Dashboard() {
  const { stats, refreshDashboard } = useContext(DashboardContext);

  useEffect(() => {
    refreshDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-600 text-white p-6 rounded-xl shadow">
          <p className="opacity-80">Income</p>
          <h2 className="text-3xl font-bold">₹{stats.totalIncome}</h2>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow">
          <p className="opacity-80">Expense</p>
          <h2 className="text-3xl font-bold">₹{stats.totalExpense}</h2>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
          <p className="opacity-80">Balance</p>
          <h2 className="text-3xl font-bold">₹{stats.balance}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Income vs Expense</h3>
          <IncomeExpenseChart
            income={stats.totalIncome}
            expense={stats.totalExpense}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Expense by Category</h3>
          <ExpenseCategoryChart data={stats.expenseByCategory || []} />
        </div>
      </div>
    </div>
  );
}