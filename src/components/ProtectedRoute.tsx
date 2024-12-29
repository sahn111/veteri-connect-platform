import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Marketplace from "../pages/Marketplace";
import AddMedicine from "../pages/AddMedicine";
import MedicineDetails from "../pages/MedicineDetails";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";
import SellerProfile from "../pages/SellerProfile";
import Purchase from "../pages/Purchase";
import ReceivedOrders from "../pages/ReceivedOrders";
import PlacedOrders from "../pages/PlacedOrders";
import ManageProducts from "../pages/ManageProducts";
import AdminDashboard from "../pages/AdminDashboard";
import { verifyToken, refreshToken } from "../utils/auth";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      const isTokenValid = await verifyToken();

      if (!isTokenValid) {
        const isTokenRefreshed = await refreshToken();

        if (!isTokenRefreshed) {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/add" element={<AddMedicine />} />
      <Route path="/marketplace/:id" element={<MedicineDetails />} />
      <Route path="/marketplace/seller/:id" element={<SellerProfile />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/orders/received" element={<ReceivedOrders />} />
      <Route path="/orders/placed" element={<PlacedOrders />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      {/* Diğer yolları ekleyebilirsiniz */}
    </Routes>
  );
};

export default ProtectedRoute;
