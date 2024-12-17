import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventorySearch } from "@/components/inventory/InventorySearch";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  min_stock: number;
  expiry_date: string;
  is_active: boolean;
}

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inventory = [], isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('name');

      if (error) {
        toast({
          variant: "destructive",
          title: "Hata",
          description: "Stok bilgileri yüklenirken bir hata oluştu.",
        });
        throw error;
      }

      return data as InventoryItem[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedItem: InventoryItem) => {
      const { error } = await supabase
        .from('inventory')
        .update({
          name: updatedItem.name,
          quantity: updatedItem.quantity,
          unit: updatedItem.unit,
          min_stock: updatedItem.min_stock,
          expiry_date: updatedItem.expiry_date,
          is_active: updatedItem.is_active,
        })
        .eq('id', updatedItem.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      toast({
        title: "Başarılı",
        description: "Ürün bilgileri güncellendi.",
      });
      setEditingId(null);
      setEditedItem(null);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Ürün güncellenirken bir hata oluştu.",
      });
      console.error('Update error:', error);
    },
  });

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditedItem({ ...item });
  };

  const handleSave = () => {
    if (!editedItem) return;
    updateMutation.mutate(editedItem);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedItem(null);
  };

  const handleStatusChange = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      toast({
        title: "Başarılı",
        description: `Ürün durumu ${isActive ? 'aktif' : 'pasif'} olarak güncellendi.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Durum güncellenirken bir hata oluştu.",
      });
      console.error('Status update error:', error);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

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