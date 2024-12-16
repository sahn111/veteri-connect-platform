import { DashboardLayout } from "@/components/DashboardLayout";
import { SearchBar } from "@/components/SearchBar";
import { MedicineCard } from "@/components/MedicineCard";
import { CartProvider } from "@/components/cart/CartProvider";
import { Cart } from "@/components/cart/Cart";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [isDesktopCartVisible, setIsDesktopCartVisible] = useState(true);

  return (
    <CartProvider>
      <DashboardLayout>
        <div className="container mx-auto px-4">
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary">Veteriner İlaç Pazarı</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Veteriner hekimlerin paylaştığı ilaçları keşfedin
            </p>
          </div>
          
          <div className="lg:grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <SearchBar />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_MEDICINES.map((medicine) => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            </div>

            {/* Desktop Cart Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:flex fixed top-4 right-4 z-30 items-center gap-2"
              onClick={() => setIsDesktopCartVisible(!isDesktopCartVisible)}
            >
              <ShoppingCart className="h-4 w-4" />
              {isDesktopCartVisible ? "Sepeti Gizle" : "Sepeti Göster"}
            </Button>

            {/* Desktop Cart */}
            <div className={`hidden lg:block lg:col-span-1 transition-all duration-300 ${
              isDesktopCartVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}>
              <div className="sticky top-16">
                <Cart />
              </div>
            </div>

            {/* Mobile Cart Sheet */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg lg:hidden"
                  size="icon"
                >
                  <ShoppingCart className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                <Cart />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </DashboardLayout>
    </CartProvider>
  );
};

export default Marketplace;