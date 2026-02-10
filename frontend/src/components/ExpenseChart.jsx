import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ data }) {
  return (
    <Pie
      data={{
        labels: data.map(d => d.category),
        datasets: [
          {
            data: data.map(d => d.amount),
            backgroundColor: ["#ef4444", "#f97316", "#22c55e", "#3b82f6"],
          },
        ],
      }}
    />
  );
}