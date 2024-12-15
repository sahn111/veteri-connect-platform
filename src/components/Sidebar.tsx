import { Link } from "react-router-dom";
import { User, ShoppingCart, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <Link to="/dashboard" className="text-primary font-bold text-xl">
            VetMedEx
          </Link>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard/profile">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link to="/dashboard/marketplace">
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Marketplace
            </Button>
          </Link>
          <Link to="/dashboard/messages">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </Link>
          <Link to="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>

        <Button variant="ghost" className="w-full justify-start mt-auto text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};