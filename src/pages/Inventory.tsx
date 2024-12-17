import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventorySearch } from "@/components/inventory/InventorySearch";
import { InventoryTable } from "@/components/inventory/InventoryTable";

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
        <InventoryHeader />
        <InventorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <InventoryTable
          inventory={filteredInventory}
          editingId={editingId}
          editedItem={editedItem}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleStatusChange={handleStatusChange}
          setEditedItem={setEditedItem}
        />
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
