import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Medicine } from "./medicine/types";
import { MedicineListItem } from "./medicine/MedicineListItem";
import { AddMedicineForm } from "./medicine/AddMedicineForm";

const MOCK_MEDICINES: Medicine[] = [
  {
    id: 1,
    name: "Amoksisilin",
    description: "Geniş spektrumlu antibiyotik",
    price: 299.99,
    quantity: 100,
    unit: "tablet",
    expiryDate: "2024-12-31",
    isActive: true,
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
  },
  {
    id: 3,
    name: "Frontline Plus",
    description: "Pire ve kene önleyici",
    price: 359.99,
    quantity: 3,
    unit: "doz",
    expiryDate: "2025-06-30",
    isActive: false,
  },
];

export const MedicineList = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedMedicine, setEditedMedicine] = useState<Medicine | null>(null);
  const { toast } = useToast();

  const handleEdit = (medicine: Medicine) => {
    setEditingId(medicine.id);
    setEditedMedicine({ ...medicine });
  };

  const handleSave = () => {
    if (!editedMedicine) return;

    setMedicines(medicines.map((m) => 
      m.id === editedMedicine.id ? editedMedicine : m
    ));
    
    setEditingId(null);
    setEditedMedicine(null);

    toast({
      title: "Başarılı",
      description: "İlaç bilgileri güncellendi.",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMedicine(null);
  };

  const handleStatusChange = (id: number, isActive: boolean) => {
    setMedicines(medicines.map((m) => 
      m.id === id ? { ...m, isActive } : m
    ));

    toast({
      title: "Başarılı",
      description: `İlaç durumu ${isActive ? 'aktif' : 'pasif'} olarak güncellendi.`,
    });
  };

  const handleDelete = (id: number) => {
    setMedicines(medicines.filter((m) => m.id !== id));
    toast({
      title: "Başarılı",
      description: "İlaç başarıyla silindi.",
    });
  };

  const handleAdd = (newMedicine: Omit<Medicine, "id">) => {
    const id = Math.max(...medicines.map((m) => m.id)) + 1;
    setMedicines([...medicines, { ...newMedicine, id }]);
  };

  return (
    <div className="space-y-6">
      <AddMedicineForm onAdd={handleAdd} />
      
      <div className="grid grid-cols-1 gap-6">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <MedicineListItem
              medicine={medicine}
              isEditing={editingId === medicine.id}
              editedMedicine={editedMedicine}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              setEditedMedicine={setEditedMedicine}
            />
          </div>
        ))}
      </div>
    </div>
  );
};