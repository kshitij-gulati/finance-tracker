import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between">
      <h1 className="font-bold text-xl">Finance Tracker</h1>

      <div className="flex gap-6 items-center">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <button
          onClick={handleLogout}
          className="text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}