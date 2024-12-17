import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "./types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

interface AddProductFormProps {
  onAdd: (product: Omit<Product, "id">) => void;
}

export const AddProductForm = ({ onAdd }: AddProductFormProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    unit: "adet",
    isActive: true,
    marketplacePrice: 0,
    isListedInMarketplace: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newProduct);
    setIsAdding(false);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      unit: "adet",
      isActive: true,
      marketplacePrice: 0,
      isListedInMarketplace: false,
    });
    toast({
      title: "Başarılı",
      description: "Yeni ürün başarıyla eklendi.",
    });
  };

  if (!isAdding) {
    return (
      <Button onClick={() => setIsAdding(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Yeni Ürün Ekle
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="new-name">Ürün Adı</Label>
          <Input
            id="new-name"
            required
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="new-price">Stok Fiyatı (₺)</Label>
          <Input
            id="new-price"
            type="number"
            required
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="new-marketplace-price">Pazar Yeri Fiyatı (₺)</Label>
          <Input
            id="new-marketplace-price"
            type="number"
            required
            value={newProduct.marketplacePrice}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                marketplacePrice: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="new-quantity">Stok Miktarı</Label>
          <Input
            id="new-quantity"
            type="number"
            required
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
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
            value={newProduct.unit}
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
            }
          />
        </div>
      </div>
      <div>
        <Label htmlFor="new-description">Açıklama</Label>
        <Input
          id="new-description"
          required
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
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