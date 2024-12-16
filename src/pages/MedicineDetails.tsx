import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Package, DollarSign, User, MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const MOCK_MEDICINE = {
  id: 1,
  name: "Amoxicillin",
  description: "Broad-spectrum antibiotic commonly used to treat various bacterial infections in animals. Effective against both gram-positive and gram-negative bacteria.",
  price: 29.99,
  quantity: 100,
  unit: "tablets",
  expiryDate: "2024-12-31",
  seller: {
    name: "Dr. Sarah Johnson",
    clinic: "Central Veterinary Hospital",
    location: "San Francisco, CA"
  }
};

const MedicineDetails = () => {
  const { id } = useParams();

  // In a real app, we would fetch the medicine details using the ID
  const medicine = MOCK_MEDICINE;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
          <p className="text-gray-600">{medicine.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Medicine Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Quantity Available</p>
                      <p className="text-gray-600">{medicine.quantity} {medicine.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Expiry Date</p>
                      <p className="text-gray-600">{new Date(medicine.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Price per Unit</p>
                      <p className="text-gray-600">${medicine.price}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">{medicine.seller.name}</p>
                      <p className="text-gray-600">{medicine.seller.clinic}</p>
                      <p className="text-gray-600">{medicine.seller.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Seller
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Seller Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicineDetails;