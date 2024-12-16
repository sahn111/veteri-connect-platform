import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Edit, Save, X, Trash2 } from "lucide-react";
import { Medicine } from "./types";

interface MedicineListItemProps {
  medicine: Medicine;
  isEditing: boolean;
  editedMedicine: Medicine | null;
  onEdit: (medicine: Medicine) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, isActive: boolean) => void;
  setEditedMedicine: (medicine: Medicine) => void;
}

export const MedicineListItem = ({
  medicine,
  isEditing,
  editedMedicine,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onStatusChange,
  setEditedMedicine,
}: MedicineListItemProps) => {
  if (isEditing && editedMedicine) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">İlaç Adı</Label>
            <Input
              id="name"
              value={editedMedicine.name}
              onChange={(e) =>
                setEditedMedicine({
                  ...editedMedicine,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="price">Fiyat (₺)</Label>
            <Input
              id="price"
              type="number"
              value={editedMedicine.price}
              onChange={(e) =>
                setEditedMedicine({
                  ...editedMedicine,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="quantity">Miktar</Label>
            <Input
              id="quantity"
              type="number"
              value={editedMedicine.quantity}
              onChange={(e) =>
                setEditedMedicine({
                  ...editedMedicine,
                  quantity: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="unit">Birim</Label>
            <Input
              id="unit"
              value={editedMedicine.unit}
              onChange={(e) =>
                setEditedMedicine({
                  ...editedMedicine,
                  unit: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="description">Açıklama</Label>
          <Input
            id="description"
            value={editedMedicine.description}
            onChange={(e) =>
              setEditedMedicine({
                ...editedMedicine,
                description: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
          <Input
            id="expiryDate"
            type="date"
            value={editedMedicine.expiryDate}
            onChange={(e) =>
              setEditedMedicine({
                ...editedMedicine,
                expiryDate: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            İptal
          </Button>
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Kaydet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{medicine.name}</h3>
          <p className="text-sm text-gray-600">{medicine.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onEdit(medicine)}>
            <Edit className="mr-2 h-4 w-4" />
            Düzenle
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(medicine.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label>Fiyat</Label>
          <p className="text-sm font-medium">{medicine.price} ₺</p>
        </div>
        <div>
          <Label>Miktar</Label>
          <p className="text-sm font-medium">
            {medicine.quantity} {medicine.unit}
          </p>
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
              onCheckedChange={(checked) => onStatusChange(medicine.id, checked)}
            />
            <span className="text-sm font-medium">
              {medicine.isActive ? "Aktif" : "Pasif"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};