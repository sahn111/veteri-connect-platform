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

  return (
    <CartProvider>
      <DashboardLayout>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary">Veteriner İlaç Pazarı</h1>
            <p className="text-muted-foreground text-sm lg:text-base mt-2">
              Veteriner hekimlerin paylaştığı ilaçları keşfedin
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <SearchBar />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {MOCK_MEDICINES.map((medicine) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
        </div>

        {/* Cart Button */}
        <Button
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary-dark"
          size="icon"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>

        {/* Cart Sheet */}
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