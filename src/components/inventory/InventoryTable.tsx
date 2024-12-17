import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Edit, Save, X } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  expiryDate: string;
  isActive: boolean;
}

interface InventoryTableProps {
  inventory: InventoryItem[];
  editingId: number | null;
  editedItem: InventoryItem | null;
  handleEdit: (item: InventoryItem) => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleStatusChange: (id: number, isActive: boolean) => void;
  setEditedItem: (item: InventoryItem) => void;
}

export const InventoryTable = ({
  inventory,
  editingId,
  editedItem,
  handleEdit,
  handleSave,
  handleCancel,
  handleStatusChange,
  setEditedItem,
}: InventoryTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>İlaç Adı</TableHead>
            <TableHead>Mevcut Stok</TableHead>
            <TableHead>Minimum Stok</TableHead>
            <TableHead>Son Kullanma Tarihi</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    value={editedItem?.name}
                    onChange={(e) =>
                      setEditedItem({ ...editedItem!, name: e.target.value })
                    }
                  />
                ) : (
                  <span className="font-medium">{item.name}</span>
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={editedItem?.quantity}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem!,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      className="w-20"
                    />
                    <Input
                      value={editedItem?.unit}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem!, unit: e.target.value })
                      }
                      className="w-20"
                    />
                  </div>
                ) : (
                  `${item.quantity} ${item.unit}`
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    type="number"
                    value={editedItem?.minStock}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem!,
                        minStock: parseInt(e.target.value),
                      })
                    }
                  />
                ) : (
                  `${item.minStock} ${item.unit}`
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    type="date"
                    value={editedItem?.expiryDate}
                    onChange={(e) =>
                      setEditedItem({
                        ...editedItem!,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                ) : (
                  new Date(item.expiryDate).toLocaleDateString()
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={(checked) =>
                      handleStatusChange(item.id, checked)
                    }
                  />
                  <span>{item.isActive ? "Aktif" : "Pasif"}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {editingId === item.id ? (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};