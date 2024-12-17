import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Product, PriceChangeConfig } from "./types";
import { PriceManagement } from "./PriceManagement";
import { ProductDetails } from "./ProductDetails";

// Mock inventory data - gerçek uygulamada API'den gelecek
const MOCK_INVENTORY = [
  {
    id: 1,
    name: "Amoksisilin",
    price: 299.99,
    description: "Geniş spektrumlu antibiyotik",
    quantity: 100,
    unit: "tablet",
    isActive: true,
    marketplacePrice: 329.99,
    isListedInMarketplace: true,
  },
  {
    id: 2,
    name: "Rimadil",
    price: 459.99,
    description: "Anti-enflamatuar ilaç",
    quantity: 50,
    unit: "tablet",
    isActive: true,
    marketplacePrice: 489.99,
    isListedInMarketplace: false,
  },
];

export const ProductManagementList = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_INVENTORY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSave = () => {
    if (!editedProduct) return;

    setProducts(products.map((p) => 
      p.id === editedProduct.id ? editedProduct : p
    ));
    
    setEditingId(null);
    setEditedProduct(null);

    toast({
      title: "Başarılı",
      description: "Ürün bilgileri güncellendi.",
    });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "Başarılı",
      description: "Ürün başarıyla silindi.",
    });
  };

  const handlePriceChange = (product: Product, increase: boolean, config: PriceChangeConfig) => {
    const amount = parseFloat(config.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Hata",
        description: "Geçerli bir miktar giriniz.",
        variant: "destructive",
      });
      return;
    }

    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        let newPrice = p.marketplacePrice || p.price;
        if (config.isPercentage) {
          const changeAmount = (newPrice * amount) / 100;
          newPrice = increase ? newPrice + changeAmount : newPrice - changeAmount;
        } else {
          newPrice = increase ? newPrice + amount : newPrice - amount;
        }

        return { 
          ...p, 
          marketplacePrice: Math.max(0, Number(newPrice.toFixed(2))) 
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    toast({
      title: "Başarılı",
      description: `${product.name} için fiyat ${increase ? "artışı" : "indirimi"} uygulandı.`,
    });
  };

  const handleMarketplaceStatusChange = (id: number, isListed: boolean) => {
    setProducts(products.map((p) => 
      p.id === id ? { ...p, isListedInMarketplace: isListed } : p
    ));

    toast({
      title: "Başarılı",
      description: `Ürün pazar yerinde ${isListed ? 'listelenecek' : 'listeden kaldırıldı'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
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
                onMarketplaceStatusChange={handleMarketplaceStatusChange}
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