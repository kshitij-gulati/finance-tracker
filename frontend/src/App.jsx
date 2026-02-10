import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Transactions />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;