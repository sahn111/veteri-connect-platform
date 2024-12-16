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
    <Card className="bg-white hover:shadow-lg transition-all duration-200 animate-fade-up">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-semibold text-primary">{medicine.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{medicine.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span>{medicine.quantity} {medicine.unit} mevcut</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Son Kullanma: {new Date(medicine.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="space-y-2 border-t pt-4 mt-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm">{medicine.seller.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">{medicine.seller.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t pt-4">
        <span className="text-xl font-bold text-primary">{medicine.price.toLocaleString('tr-TR')} ₺</span>
        <div className="flex flex-wrap gap-2 items-center justify-end">
          <div className="flex items-center border rounded-md bg-muted">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary-dark">
            Sepete Ekle
          </Button>
          <Link to={`/dashboard/marketplace/${medicine.id}`}>
            <Button variant="outline">Detayları Gör</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};