import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}