import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Medicine } from "./types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

interface AddMedicineFormProps {
  onAdd: (medicine: Omit<Medicine, "id">) => void;
}

export const AddMedicineForm = ({ onAdd }: AddMedicineFormProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, "id">>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    unit: "tablet",
    expiryDate: "",
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newMedicine);
    setIsAdding(false);
    setNewMedicine({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      unit: "tablet",
      expiryDate: "",
      isActive: true,
    });
    toast({
      title: "Başarılı",
      description: "Yeni ilaç başarıyla eklendi.",
    });
  };

  if (!isAdding) {
    return (
      <Button onClick={() => setIsAdding(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Yeni İlaç Ekle
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="new-name">İlaç Adı</Label>
          <Input
            id="new-name"
            required
            value={newMedicine.name}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, name: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="new-price">Fiyat (₺)</Label>
          <Input
            id="new-price"
            type="number"
            required
            value={newMedicine.price}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                price: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="new-quantity">Miktar</Label>
          <Input
            id="new-quantity"
            type="number"
            required
            value={newMedicine.quantity}
            onChange={(e) =>
              setNewMedicine({
                ...newMedicine,
                quantity: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="new-unit">Birim</Label>
          <Input
            id="new-unit"
            required
            value={newMedicine.unit}
            onChange={(e) =>
              setNewMedicine({ ...newMedicine, unit: e.target.value })
            }
          />
        </div>
      </div>
      <div>
        <Label htmlFor="new-description">Açıklama</Label>
        <Input
          id="new-description"
          required
          value={newMedicine.description}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, description: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="new-expiryDate">Son Kullanma Tarihi</Label>
        <Input
          id="new-expiryDate"
          type="date"
          required
          value={newMedicine.expiryDate}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, expiryDate: e.target.value })
          }
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
          İptal
        </Button>
        <Button type="submit">Ekle</Button>
      </div>
    </form>
  );
};