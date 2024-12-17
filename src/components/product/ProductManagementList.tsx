import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DollarSign, 
  Percent, 
  ArrowUp, 
  ArrowDown, 
  Edit, 
  Save, 
  Trash 
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  unit: string;
  isActive: boolean;
}

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Amoksisilin",
    price: 299.99,
    description: "Geniş spektrumlu antibiyotik",
    quantity: 100,
    unit: "tablet",
    isActive: true,
  },
  {
    id: 2,
    name: "Rimadil",
    price: 459.99,
    description: "Anti-enflamatuar ilaç",
    quantity: 50,
    unit: "tablet",
    isActive: true,
  },
];

export const ProductManagementList = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [priceChangeAmount, setPriceChangeAmount] = useState<string>("");
  const [isPercentage, setIsPercentage] = useState(true);
  const { toast } = useToast();

  const handlePriceChange = (product: Product, increase: boolean) => {
    const amount = parseFloat(priceChangeAmount);
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
        let newPrice = p.price;
        if (isPercentage) {
          const changeAmount = (p.price * amount) / 100;
          newPrice = increase ? p.price + changeAmount : p.price - changeAmount;
        } else {
          newPrice = increase ? p.price + amount : p.price - amount;
        }

        // Fiyat 0'ın altına düşemez
        newPrice = Math.max(0, newPrice);

        return { ...p, price: Number(newPrice.toFixed(2)) };
      }
      return p;
    });

    setProducts(updatedProducts);
    toast({
      title: "Başarılı",
      description: `${product.name} için fiyat ${increase ? "artışı" : "indirimi"} uygulandı.`,
    });
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    setProducts(products.map((p) => 
      p.id === editingProduct.id ? editingProduct : p
    ));

    setEditingProduct(null);
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

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <Card key={product.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{product.name}</span>
              <span className="text-2xl font-bold text-primary">
                {product.price.toLocaleString('tr-TR')} ₺
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Stok: {product.quantity} {product.unit}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Fiyat Güncelle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Fiyat Güncelleme - {product.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={isPercentage ? "default" : "outline"}
                      onClick={() => setIsPercentage(true)}
                      className="flex items-center gap-2"
                    >
                      <Percent className="h-4 w-4" />
                      Yüzde
                    </Button>
                    <Button
                      variant={!isPercentage ? "default" : "outline"}
                      onClick={() => setIsPercentage(false)}
                      className="flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      Tutar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {isPercentage ? "Yüzde Değeri" : "Tutar"} ({isPercentage ? "%" : "₺"})
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step={isPercentage ? "1" : "0.01"}
                      value={priceChangeAmount}
                      onChange={(e) => setPriceChangeAmount(e.target.value)}
                      placeholder={isPercentage ? "Örn: 10" : "Örn: 50.00"}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handlePriceChange(product, true)}
                    >
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Zam Uygula
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handlePriceChange(product, false)}
                    >
                      <ArrowDown className="h-4 w-4 mr-2" />
                      İndirim Uygula
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Düzenle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ürün Düzenleme</DialogTitle>
                </DialogHeader>
                {editingProduct && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Ürün Adı</Label>
                      <Input
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Açıklama</Label>
                      <Input
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stok Miktarı</Label>
                      <Input
                        type="number"
                        value={editingProduct.quantity}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            quantity: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <Button onClick={handleSaveEdit} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Kaydet
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Button
              variant="destructive"
              onClick={() => handleDelete(product.id)}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              Sil
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};