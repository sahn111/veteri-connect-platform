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
    <Card className="w-full max-w-md bg-white hover:shadow-lg transition-all duration-200 animate-fade-up">
      <CardHeader className="space-y-4 p-6">
        <CardTitle className="text-2xl font-bold text-primary">
          {medicine.name}
        </CardTitle>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {medicine.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-4 text-base">
          <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
            <Package className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="font-medium">{medicine.quantity} {medicine.unit} mevcut</span>
          </div>
          <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
            <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="font-medium">Son Kullanma: {new Date(medicine.expiryDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center gap-3 p-3">
            <User className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-base font-medium">{medicine.seller.name}</span>
          </div>
          <div className="flex items-center gap-3 p-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-base font-medium">{medicine.seller.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 border-t p-6">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-primary">
            {medicine.price.toLocaleString('tr-TR')} ₺
          </span>
          <div className="flex items-center border rounded-lg bg-muted/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-12 w-12"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-16 text-center text-lg font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-12 w-12"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-primary hover:bg-primary-dark text-white h-12 text-lg font-medium"
          >
            Sepete Ekle
          </Button>
          <Link to={`/dashboard/marketplace/${medicine.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 h-12 text-lg font-medium"
            >
              Detayları Gör
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};