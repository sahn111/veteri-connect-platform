import { DashboardLayout } from "@/components/DashboardLayout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Package, DollarSign, User, MessageSquare } from "lucide-react";
import { useParams, Link } from "react-router-dom";

// Mock data - gerçek uygulamada bu veriler API'den gelecek
const MOCK_MEDICINE = {
  id: 1,
  name: "Amoksisilin",
  description: "Hayvanlarda çeşitli bakteriyel enfeksiyonların tedavisinde kullanılan geniş spektrumlu antibiyotik. Hem gram-pozitif hem de gram-negatif bakterilere karşı etkili.",
  price: 299.99,
  quantity: 100,
  unit: "tablet",
  expiryDate: "2024-12-31",
  seller: {
    id: 1,
    name: "Dr. Ayşe Yılmaz",
    clinic: "Merkez Veteriner Kliniği",
    location: "İstanbul"
  }
};

const MedicineDetails = () => {
  const { id } = useParams();
  const medicine = MOCK_MEDICINE;

  const helpContent = `
    İlaç Detayları sayfasında:
    1. İlacın tüm özelliklerini görebilirsiniz
    2. Satıcı bilgilerine ulaşabilirsiniz
    3. Satıcıyla iletişime geçebilirsiniz
    4. Satıcının profilini görüntüleyebilirsiniz
    5. Geri butonu ile önceki sayfaya dönebilirsiniz
  `;

  return (
    <DashboardLayout helpContent={helpContent}>
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
          <p className="text-gray-600">{medicine.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">İlaç Detayları</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Mevcut Miktar</p>
                      <p className="text-gray-600">{medicine.quantity} {medicine.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Son Kullanma Tarihi</p>
                      <p className="text-gray-600">{new Date(medicine.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Birim Fiyat</p>
                      <p className="text-gray-600">{medicine.price} ₺</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Satıcı Bilgileri</h2>
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
                      Satıcıyla İletişime Geç
                    </Button>
                    <Link to={`/dashboard/marketplace/seller/${medicine.seller.id}`}>
                      <Button variant="outline" className="w-full">
                        Satıcı Profilini Gör
                      </Button>
                    </Link>
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
