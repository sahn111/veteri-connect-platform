import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg">{medicine.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{medicine.description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            {medicine.quantity} {medicine.unit} mevcut
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Son Kullanma: {new Date(medicine.expiryDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {medicine.seller.name}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {medicine.seller.location}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold">{medicine.price.toLocaleString('tr-TR')} ₺</span>
        <Link to={`/dashboard/marketplace/${medicine.id}`}>
          <Button>Detayları Gör</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};