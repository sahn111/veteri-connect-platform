import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary font-bold text-xl">VetPazar</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary">Özellikler</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary">Nasıl Çalışır</a>
            <Link to="/login">
              <Button variant="outline" className="mr-2">Giriş Yap</Button>
            </Link>
            <Link to="/register">
              <Button>Kayıt Ol</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-up">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-primary px-2 py-1">Özellikler</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary px-2 py-1">Nasıl Çalışır</a>
              <Link to="/login">
                <Button variant="outline" className="w-full mb-2">Giriş Yap</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">Kayıt Ol</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};