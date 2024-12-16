import { DashboardLayout } from "@/components/DashboardLayout";
import { SearchBar } from "@/components/SearchBar";
import { MedicineCard } from "@/components/MedicineCard";

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
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Veteriner İlaç Pazarı</h1>
          <p className="text-gray-600 mt-2">
            Veteriner hekimlerin paylaştığı ilaçları keşfedin
          </p>
        </div>
        
        <SearchBar />
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MEDICINES.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;