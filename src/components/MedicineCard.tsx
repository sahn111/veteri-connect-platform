import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package } from "lucide-react";
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
}

interface MedicineCardProps {
  medicine: Medicine;
}

export const MedicineCard = ({ medicine }: MedicineCardProps) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${!medicine.isActive ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{medicine.name}</CardTitle>
          <span className={`text-sm px-2 py-1 rounded-full ${
            medicine.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {medicine.isActive ? 'Aktif' : 'Pasif'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{medicine.description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            {medicine.quantity} {medicine.unit}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Son Kullanma: {new Date(medicine.expiryDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold">{medicine.price} ₺</span>
        <Link to={`/dashboard/marketplace/${medicine.id}`}>
          <Button variant="outline">Detayları Gör</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};