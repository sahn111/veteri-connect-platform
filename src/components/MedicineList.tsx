import { useState } from "react";
import { MedicineCard } from "./MedicineCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Edit, Save, X } from "lucide-react";

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

    setMedicines(medicines.map(m => 
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
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, isActive } : m
    ));

    toast({
      title: "Başarılı",
      description: `İlaç durumu ${isActive ? 'aktif' : 'pasif'} olarak güncellendi.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white p-6 rounded-lg shadow-sm border">
            {editingId === medicine.id && editedMedicine ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">İlaç Adı</Label>
                    <Input
                      id="name"
                      value={editedMedicine.name}
                      onChange={(e) => setEditedMedicine({
                        ...editedMedicine,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Fiyat (₺)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editedMedicine.price}
                      onChange={(e) => setEditedMedicine({
                        ...editedMedicine,
                        price: parseFloat(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Miktar</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={editedMedicine.quantity}
                      onChange={(e) => setEditedMedicine({
                        ...editedMedicine,
                        quantity: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Birim</Label>
                    <Input
                      id="unit"
                      value={editedMedicine.unit}
                      onChange={(e) => setEditedMedicine({
                        ...editedMedicine,
                        unit: e.target.value
                      })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Input
                    id="description"
                    value={editedMedicine.description}
                    onChange={(e) => setEditedMedicine({
                      ...editedMedicine,
                      description: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={editedMedicine.expiryDate}
                    onChange={(e) => setEditedMedicine({
                      ...editedMedicine,
                      expiryDate: e.target.value
                    })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="mr-2 h-4 w-4" />
                    İptal
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{medicine.name}</h3>
                    <p className="text-sm text-gray-600">{medicine.description}</p>
                  </div>
                  <Button variant="outline" onClick={() => handleEdit(medicine)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Düzenle
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Fiyat</Label>
                    <p className="text-sm font-medium">{medicine.price} ₺</p>
                  </div>
                  <div>
                    <Label>Miktar</Label>
                    <p className="text-sm font-medium">{medicine.quantity} {medicine.unit}</p>
                  </div>
                  <div>
                    <Label>Son Kullanma Tarihi</Label>
                    <p className="text-sm font-medium">
                      {new Date(medicine.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label>Durum</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={medicine.isActive}
                        onCheckedChange={(checked) => handleStatusChange(medicine.id, checked)}
                      />
                      <span className="text-sm font-medium">
                        {medicine.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};