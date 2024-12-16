import { MedicineCard } from "./MedicineCard";

const MOCK_MEDICINES = [
  {
    id: 1,
    name: "Amoxicillin",
    description: "Broad-spectrum antibiotic",
    price: 29.99,
    quantity: 100,
    unit: "tablets",
    expiryDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Rimadyl",
    description: "Anti-inflammatory medication",
    price: 45.99,
    quantity: 50,
    unit: "tablets",
    expiryDate: "2024-10-15",
  },
  {
    id: 3,
    name: "Frontline Plus",
    description: "Flea and tick prevention",
    price: 35.99,
    quantity: 3,
    unit: "doses",
    expiryDate: "2025-06-30",
  },
];

export const MedicineList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_MEDICINES.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
};