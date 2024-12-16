import { Link, useLocation } from "react-router-dom";
import { User, ShoppingCart, MessageSquare, Settings, LogOut, Package } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 flex flex-col h-full">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/dashboard" className="text-primary font-bold text-xl" onClick={handleLinkClick}>
            VetMedEx
          </Link>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard/marketplace" onClick={handleLinkClick}>
            <Button 
              variant={isActive("/dashboard/marketplace") ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive("/dashboard/marketplace") && "bg-primary/10"
              )}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Pazar Yeri
            </Button>
          </Link>
          <Link to="/dashboard/inventory" onClick={handleLinkClick}>
            <Button 
              variant={isActive("/dashboard/inventory") ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive("/dashboard/inventory") && "bg-primary/10"
              )}
            >
              <Package className="mr-2 h-4 w-4" />
              Stok Takibi
            </Button>
          </Link>
          <Link to="/dashboard/messages" onClick={handleLinkClick}>
            <Button 
              variant={isActive("/dashboard/messages") ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive("/dashboard/messages") && "bg-primary/10"
              )}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Mesajlar
            </Button>
          </Link>
          <Link to="/dashboard/settings" onClick={handleLinkClick}>
            <Button 
              variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive("/dashboard/settings") && "bg-primary/10"
              )}
            >
              <Settings className="mr-2 h-4 w-4" />
              Ayarlar
            </Button>
          </Link>
        </nav>

        <div className="mt-auto space-y-2">
          <Link to="/dashboard/profile" onClick={handleLinkClick}>
            <Button 
              variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start",
                isActive("/dashboard/profile") && "bg-primary/10"
              )}
            >
              <User className="mr-2 h-3 w-3" />
              Profil
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLinkClick}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
};