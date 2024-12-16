import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Package, Search, AlertTriangle, Edit, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_INVENTORY = [
  {
    id: 1,
    name: "Amoksisilin",
    quantity: 100,
    unit: "tablet",
    minStock: 20,
    expiryDate: "2024-12-31",
    isActive: true,
  },
  {
    id: 2,
    name: "Vitamin B12",
    quantity: 15,
    unit: "ampul",
    minStock: 10,
    expiryDate: "2024-06-30",
    isActive: true,
  },
  {
    id: 3,
    name: "Antibiyotik Merhem",
    quantity: 8,
    unit: "tüp",
    minStock: 5,
    expiryDate: "2024-09-15",
    isActive: false,
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditedItem({ ...item });
  };

  const handleSave = () => {
    if (!editedItem) return;

    setInventory(inventory.map((item) => 
      item.id === editedItem.id ? editedItem : item
    ));
    
    setEditingId(null);
    setEditedItem(null);

    toast({
      title: "Başarılı",
      description: "Ürün bilgileri güncellendi.",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedItem(null);
  };

  const handleStatusChange = (id: number, isActive: boolean) => {
    setInventory(inventory.map((item) => 
      item.id === id ? { ...item, isActive } : item
    ));

    toast({
      title: "Başarılı",
      description: `Ürün durumu ${isActive ? 'aktif' : 'pasif'} olarak güncellendi.`,
    });
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Stok Takibi</h1>
          <Button onClick={() => navigate("/dashboard/marketplace/add")}>
            <Package className="mr-2 h-4 w-4" />
            Yeni Ürün Ekle
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="İlaç ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

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
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        value={editedItem.name}
                        onChange={(e) =>
                          setEditedItem({ ...editedItem, name: e.target.value })
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
                          value={editedItem.quantity}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem,
                              quantity: parseInt(e.target.value),
                            })
                          }
                          className="w-20"
                        />
                        <Input
                          value={editedItem.unit}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, unit: e.target.value })
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
                        value={editedItem.minStock}
                        onChange={(e) =>
                          setEditedItem({
                            ...editedItem,
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
                        value={editedItem.expiryDate}
                        onChange={(e) =>
                          setEditedItem({
                            ...editedItem,
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                        >
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
      </div>
    </DashboardLayout>
  );
};

export default Inventory;