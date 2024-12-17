import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { PriceManagement } from "./PriceManagement";
import { ProductDetails } from "./ProductDetails";
import { AddProductForm } from "./AddProductForm";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { PriceChangeConfig } from "./types";

type InventoryItem = Tables<"inventory">;

interface ProductManagementListProps {
  inventory: InventoryItem[];
}

export const ProductManagementList = ({ inventory }: ProductManagementListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<InventoryItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleEdit = (product: InventoryItem) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSave = async () => {
    if (!editedProduct) return;

    const { error } = await supabase
      .from('inventory')
      .update({
        name: editedProduct.name,
        quantity: editedProduct.quantity,
        unit: editedProduct.unit,
        min_stock: editedProduct.min_stock,
        expiry_date: editedProduct.expiry_date,
        is_active: editedProduct.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editedProduct.id);

    if (error) {
      toast({
        title: "Hata",
        description: "Ürün güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    setEditingId(null);
    setEditedProduct(null);

    toast({
      title: "Başarılı",
      description: "Ürün bilgileri güncellendi.",
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('inventory')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      toast({
        title: "Hata",
        description: "Ürün silinirken bir hata oluştu.",
        variant: "destructive",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    toast({
      title: "Başarılı",
      description: "Ürün başarıyla silindi.",
    });
  };

  const handlePriceChange = async (product: InventoryItem, increase: boolean, config: PriceChangeConfig) => {
    const amount = parseFloat(config.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Hata",
        description: "Geçerli bir miktar giriniz.",
        variant: "destructive",
      });
      return;
    }

    const newQuantity = increase ? product.quantity + amount : product.quantity - amount;

    const { error } = await supabase
      .from('inventory')
      .update({
        quantity: Math.max(0, newQuantity),
        updated_at: new Date().toISOString(),
      })
      .eq('id', product.id);

    if (error) {
      toast({
        title: "Hata",
        description: "Fiyat güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    toast({
      title: "Başarılı",
      description: `${product.name} için ${increase ? "artış" : "indirim"} uygulandı.`,
    });
  };

  const handleAddProduct = async (newProduct: Omit<InventoryItem, "id" | "created_at" | "updated_at" | "owner_id">) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Hata",
        description: "Oturum açmanız gerekiyor.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('inventory')
      .insert({
        ...newProduct,
        owner_id: user.id,
      });

    if (error) {
      toast({
        title: "Hata",
        description: "Ürün eklenirken bir hata oluştu.",
        variant: "destructive",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['inventory'] });
    toast({
      title: "Başarılı",
      description: "Yeni ürün başarıyla eklendi.",
    });
  };

  return (
    <div className="space-y-6">
      <AddProductForm onAdd={handleAddProduct} />
      <div className="grid grid-cols-1 gap-6">
        {inventory.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <ProductDetails
                product={product}
                isEditing={editingId === product.id}
                editedProduct={editedProduct}
                onEdit={handleEdit}
                onSave={handleSave}
                onDelete={handleDelete}
                setEditedProduct={setEditedProduct}
                onMarketplaceStatusChange={() => {}}
              />
              <div className="mt-4">
                <PriceManagement
                  product={product}
                  onPriceChange={handlePriceChange}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};