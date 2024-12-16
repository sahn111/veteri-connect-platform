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
    <Card className="max-h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Sepetim ({items.length} ürün)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto flex-grow">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-4">
            <div className="flex-grow min-w-0">
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price.toLocaleString('tr-TR')} ₺</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="h-7 w-7"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center gap-4 border-t pt-4 mt-auto">
        <div className="w-full sm:w-auto">
          <p className="text-lg font-semibold">Toplam: {total.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={clearCart} className="flex-1 sm:flex-none">
            Sepeti Temizle
          </Button>
          <Button className="flex-1 sm:flex-none">
            Satın Al
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};