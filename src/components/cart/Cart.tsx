import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Sepetim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Sepetiniz boş</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Sepetim ({items.length} ürün)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price} ₺</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">Toplam: {total.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={clearCart}>
            Sepeti Temizle
          </Button>
          <Button>
            Satın Al
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};