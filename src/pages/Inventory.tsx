import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Package, Search, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_INVENTORY = [
  {
    id: 1,
    name: "Amoksisilin",
    quantity: 100,
    unit: "tablet",
    minStock: 20,
    expiryDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Vitamin B12",
    quantity: 15,
    unit: "ampul",
    minStock: 10,
    expiryDate: "2024-06-30",
  },
  {
    id: 3,
    name: "Antibiyotik Merhem",
    quantity: 8,
    unit: "tüp",
    minStock: 5,
    expiryDate: "2024-09-15",
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const { toast } = useToast();

  const handleUpdateStock = (id: number, newQuantity: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    toast({
      title: "Stok güncellendi",
      description: "İlaç stoğu başarıyla güncellendi.",
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
          <Button>
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
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell>{item.minStock} {item.unit}</TableCell>
                  <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {item.quantity <= item.minStock && (
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Düşük Stok
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStock(item.id, item.quantity + 1)}
                    >
                      Stok Güncelle
                    </Button>
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