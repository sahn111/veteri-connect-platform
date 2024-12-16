import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package, MapPin, User, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./cart/CartProvider";

interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  expiryDate: string;
  isActive: boolean;
  seller: {
    name: string;
    clinic: string;
    location: string;
  };
}

interface MedicineCardProps {
  medicine: Medicine;
}

export const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: quantity,
      unit: medicine.unit,
    });
  };

  return (
    <Card className="flex flex-col h-full w-full max-w-2xl bg-white hover:shadow-lg transition-all duration-200 animate-fade-up">
      <CardHeader className="flex-none space-y-4 px-6">
        <CardTitle className="text-2xl font-semibold text-primary">
          {medicine.name}
        </CardTitle>
        <p className="text-base text-muted-foreground">
          {medicine.description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow px-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 text-base text-muted-foreground">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              <span>{medicine.quantity} {medicine.unit} mevcut</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Son Kullanma: {new Date(medicine.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-base">{medicine.seller.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-base">{medicine.seller.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-none border-t pt-6 px-6 space-y-6">
        <div className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {medicine.price.toLocaleString('tr-TR')} ₺
            </span>
            <div className="flex items-center border rounded-md bg-muted">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 w-full">
            <Button 
              onClick={handleAddToCart} 
              className="w-full bg-primary hover:bg-primary-dark text-white py-6 text-lg"
            >
              Sepete Ekle
            </Button>
            <Link to={`/dashboard/marketplace/${medicine.id}`} className="w-full">
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary/10 py-6 text-lg"
              >
                Detayları Gör
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};