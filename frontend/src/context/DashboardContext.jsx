import { createContext, useState } from "react";
import api from "../api/axios";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState(null);

  const refreshDashboard = async () => {
    const res = await api.get("/dashboard");
    console.log("Dashboard data:", res.data);
    setStats(res.data);
  };

  return (
    <DashboardContext.Provider value={{ stats, refreshDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};