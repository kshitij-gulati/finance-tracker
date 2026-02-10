import Navbar from "./Navbar";
import { DashboardProvider } from "../context/DashboardContext";

export default function ProtectedLayout({ children }) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </DashboardProvider>
  );
}