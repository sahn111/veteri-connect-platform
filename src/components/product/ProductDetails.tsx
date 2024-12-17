import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Edit, Save, Trash } from "lucide-react";
import { Product } from "./types";

interface ProductDetailsProps {
  product: Product;
  isEditing: boolean;
  editedProduct: Product | null;
  onEdit: (product: Product) => void;
  onSave: () => void;
  onDelete: (id: number) => void;
  setEditedProduct: (product: Product) => void;
  onMarketplaceStatusChange: (id: number, isListed: boolean) => void;
}

export const ProductDetails = ({
  product,
  isEditing,
  editedProduct,
  onEdit,
  onSave,
  onDelete,
  setEditedProduct,
  onMarketplaceStatusChange,
}: ProductDetailsProps) => {
  if (isEditing && editedProduct) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Pazar Yeri Fiyatı (₺)</Label>
            <Input
              type="number"
              value={editedProduct.marketplacePrice || 0}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  marketplacePrice: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div>
            <Label>Stok Miktarı</Label>
            <Input
              type="number"
              value={editedProduct.quantity}
              readOnly
              className="bg-gray-100"
            />
          </div>
        </div>
        <div>
          <Label>Açıklama</Label>
          <Input
            value={editedProduct.description}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
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
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onEdit(product)}>
            <Edit className="h-4 w-4 mr-2" />
            Düzenle
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(product.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label>Stok Fiyatı</Label>
          <p className="text-sm font-medium">{product.price} ₺</p>
        </div>
        <div>
          <Label>Pazar Yeri Fiyatı</Label>
          <p className="text-sm font-medium">
            {product.marketplacePrice || product.price} ₺
          </p>
        </div>
        <div>
          <Label>Stok Miktarı</Label>
          <p className="text-sm font-medium">
            {product.quantity} {product.unit}
          </p>
        </div>
        <div>
          <Label>Pazar Yerinde Listele</Label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={product.isListedInMarketplace}
              onCheckedChange={(checked) => onMarketplaceStatusChange(product.id, checked)}
            />
            <span className="text-sm font-medium">
              {product.isListedInMarketplace ? "Listelendi" : "Listelenmedi"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};