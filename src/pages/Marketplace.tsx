import { DashboardLayout } from "@/components/DashboardLayout";
import { SearchBar } from "@/components/SearchBar";
import { MedicineCard } from "@/components/MedicineCard";
import { CartProvider } from "@/components/cart/CartProvider";
import { Cart } from "@/components/cart/Cart";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MOCK_MEDICINES = [
  {
    id: 1,
    name: "Amoksisilin",
    description: "Geniş spektrumlu antibiyotik",
    price: 299.99,
    quantity: 100,
    unit: "tablet",
    expiryDate: "2024-12-31",
    isActive: true,
    seller: {
      name: "Dr. Ayşe Yılmaz",
      clinic: "Merkez Veteriner Kliniği",
      location: "İstanbul"
    }
  },
  {
    id: 2,
    name: "Rimadil",
    description: "Anti-enflamatuar ilaç",
    price: 459.99,
    quantity: 50,
    unit: "tablet",
    expiryDate: "2024-10-15",
    isActive: true,
    seller: {
      name: "Dr. Mehmet Demir",
      clinic: "Hayat Veteriner Kliniği",
      location: "Ankara"
    }
  },
  {
    id: 3,
    name: "Frontline Plus",
    description: "Pire ve kene önleyici",
    price: 359.99,
    quantity: 3,
    unit: "doz",
    expiryDate: "2025-06-30",
    isActive: true,
    seller: {
      name: "Dr. Zeynep Kaya",
      clinic: "Dostlar Veteriner Kliniği",
      location: "İzmir"
    }
  },
];

const Marketplace = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const helpContent = `
    Pazaryeri sayfasında:
    1. Üst kısımdaki arama çubuğunu kullanarak ilaç arayabilirsiniz
    2. Her ilaç kartında detaylı bilgi ve satın alma seçenekleri bulunur
    3. Sağ alttaki sepet butonu ile siparişlerinizi yönetebilirsiniz
    4. İlaç kartlarındaki "Detaylar" butonu ile ürün hakkında daha fazla bilgi alabilirsiniz
  `;

  return (
    <CartProvider>
      <DashboardLayout helpContent={helpContent}>
        <div className="min-h-screen bg-muted/30 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                Veteriner İlaç Pazarı
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Veteriner hekimlerin paylaştığı ilaçları keşfedin
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <SearchBar />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch justify-items-center">
              {MOCK_MEDICINES.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
        </div>

        <Button
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-50 bg-primary hover:bg-primary-dark"
          size="icon"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-8 w-8" />
        </Button>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent side="right" className="w-full sm:max-w-[600px] p-0">
            <Cart />
          </SheetContent>
        </Sheet>
      </DashboardLayout>
    </CartProvider>
  );
};

export default Marketplace;
