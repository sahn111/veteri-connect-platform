import { DashboardLayout } from "@/components/DashboardLayout";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MedicineCard } from "@/components/MedicineCard";
import { MapPin, Mail, Phone, Building, Award, MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";
import { Medicine } from "@/components/medicine/types";

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_SELLER = {
  id: "1",
  name: "Dr. Ayşe Yılmaz",
  clinic: "Merkez Veteriner Kliniği",
  location: "İstanbul, Kadıköy",
  email: "ayse.yilmaz@vetmedex.com",
  phone: "+90 532 123 45 67",
  licenseNumber: "VET-2024-1234",
  about: "10 yıllık veteriner hekim tecrübesiyle küçük ve büyük hayvanların tedavisinde uzmanlaşmış bir profesyonel.",
  medicines: [
    {
      id: "1",
      name: "Amoksisilin",
      description: "Geniş spektrumlu antibiyotik",
      price: 299.99,
      quantity: 100,
      unit: "tablet",
      expiry_date: "2024-12-31",
      is_active: true,
      seller_id: "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      seller: {
        name: "Dr. Ayşe Yılmaz",
        clinic: "Merkez Veteriner Kliniği",
        location: "İstanbul",
        full_name: "Dr. Ayşe Yılmaz",
        email: "ayse.yilmaz@vetmedex.com"
      }
    },
    {
      id: "2",
      name: "Rimadil",
      description: "Anti-enflamatuar ilaç",
      price: 459.99,
      quantity: 50,
      unit: "tablet",
      expiry_date: "2024-10-15",
      is_active: true,
      seller_id: "1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      seller: {
        name: "Dr. Ayşe Yılmaz",
        clinic: "Merkez Veteriner Kliniği",
        location: "İstanbul",
        full_name: "Dr. Ayşe Yılmaz",
        email: "ayse.yilmaz@vetmedex.com"
      }
    }
  ] as (Medicine & {
    seller: {
      name: string;
      clinic: string;
      location: string;
      full_name: string;
      email: string;
    };
  })[]
};

const SellerProfile = () => {
  const { id } = useParams();
  const seller = MOCK_SELLER; // Gerçek uygulamada ID'ye göre satıcı bilgileri çekilecek

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <BackButton />
        <div className="grid md:grid-cols-3 gap-6">
          {/* Satıcı Bilgileri */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{seller.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{seller.clinic}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{seller.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{seller.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>Lisans No: {seller.licenseNumber}</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mesaj Gönder
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hakkında</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{seller.about}</p>
              </CardContent>
            </Card>
          </div>

          {/* İlaç Listesi */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Satıştaki İlaçlar</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {seller.medicines.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerProfile;