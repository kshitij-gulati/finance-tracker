import { useEffect, useState } from "react";
import api from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
  
    const fetchTransactions = async () => {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    };
  
    useEffect(() => {
      fetchTransactions();
    }, []);
  
    const handleAdd = async () => {
      await fetchTransactions();
    };
  
    const handleDelete = (id) => {
      setTransactions((prev) =>
        prev.filter((tx) => tx._id !== id)
      );
    };

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>
        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={transactions} />
      </div>
    );
  }