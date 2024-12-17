import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./components/cart/CartProvider";
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';
import { supabase } from "./integrations/supabase/client";
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
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
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
              <Route path="/dashboard/*" element={<ProtectedRoute />} />
              <Route path="/admin" element={<AdminProtectedRoute />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

const ProtectedRoute = () => {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/login" />;
  }

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
    </Routes>
  );
};

const AdminProtectedRoute = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile;
    },
  });

  if (!profile?.is_admin) {
    return <Navigate to="/dashboard" />;
  }

  return <AdminDashboard />;
};

export default App;