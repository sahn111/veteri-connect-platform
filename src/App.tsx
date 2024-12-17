import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cart/CartProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AddMedicine from "./pages/AddMedicine";
import MedicineDetails from "./pages/MedicineDetails";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Inventory from "./pages/Inventory";
import SellerProfile from "./pages/SellerProfile";
import Purchase from "./pages/Purchase";
import Walkthrough from "./pages/Walkthrough";
import ReceivedOrders from "./pages/ReceivedOrders";
import PlacedOrders from "./pages/PlacedOrders";
import ManageProducts from "./pages/ManageProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/walkthrough" element={<Walkthrough />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/marketplace" element={<Marketplace />} />
            <Route path="/dashboard/marketplace/add" element={<AddMedicine />} />
            <Route path="/dashboard/marketplace/:id" element={<MedicineDetails />} />
            <Route path="/dashboard/marketplace/seller/:id" element={<SellerProfile />} />
            <Route path="/dashboard/messages" element={<Messages />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/inventory" element={<Inventory />} />
            <Route path="/dashboard/purchase" element={<Purchase />} />
            <Route path="/dashboard/orders/received" element={<ReceivedOrders />} />
            <Route path="/dashboard/orders/placed" element={<PlacedOrders />} />
            <Route path="/dashboard/manage-products" element={<ManageProducts />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;