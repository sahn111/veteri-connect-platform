import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Cart } from "./cart/Cart";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex h-screen relative">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted p-4 lg:p-8 w-full lg:pl-64">
        <div className="max-w-[1600px] mx-auto pt-14 lg:pt-0">
          {children}
        </div>
      </main>

      {/* Cart Button */}
      <Button
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-50 bg-primary hover:bg-primary-dark"
        size="icon"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-8 w-8" />
      </Button>

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[600px] p-0">
          <Cart />
        </SheetContent>
      </Sheet>
    </div>
  );
};