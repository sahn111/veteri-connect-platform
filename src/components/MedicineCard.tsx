import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package, MapPin, User, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./cart/CartProvider";
import { Medicine } from "./medicine/types";

interface MedicineCardProps {
  medicine: Medicine & {
    seller: {
      full_name: string | null;
      email: string | null;
    };
  };
}

export const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: Number(medicine.id),
      name: medicine.name,
      price: Number(medicine.price),
      quantity: quantity,
      unit: medicine.unit,
    });
  };

  const sellerDisplayName = medicine.seller.full_name || medicine.seller.email || 'İsimsiz Satıcı';

  return (
    <Card className="w-full max-w-[400px] bg-white hover:shadow-lg transition-all duration-200 animate-fade-up">
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
            <span className="font-medium">Son Kullanma: {new Date(medicine.expiry_date).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center gap-3 p-3">
            <User className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-base font-medium">{sellerDisplayName}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-6 border-t p-6">
        <div className="flex flex-col space-y-4 w-full">
          <span className="text-2xl font-bold text-primary">
            {Number(medicine.price).toLocaleString('tr-TR')} ₺
          </span>
          <div className="flex items-center border rounded-lg bg-muted/50 w-fit">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-lg font-medium">{quantity}</span>
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
        
        <div className="flex flex-col gap-3 w-full">
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-primary hover:bg-primary/90 text-white h-11 text-lg font-medium"
          >
            Sepete Ekle
          </Button>
          <Link to={`/dashboard/marketplace/${medicine.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 h-11 text-lg font-medium"
            >
              Detayları Gör
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};