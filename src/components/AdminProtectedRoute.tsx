import React from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import { verifyToken, refreshToken } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";

const AdminProtectedRoute: React.FC = () => {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch("/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.status === 401) {
        const isTokenRefreshed = await refreshToken();
        if (!isTokenRefreshed) {
          navigate("/login");
        }
      }

      const profile = await response.json();
      return profile;
    },
  });

  if (!profile?.is_admin) {
    return <Navigate to="/dashboard" />;
  }

  return <AdminDashboard />;
};

export default AdminProtectedRoute;
