import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Sepetim
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Sepetiniz boş</p>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Sepetim ({items.length} ürün)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-6">
            <div className="flex-grow min-w-0">
              <h3 className="font-medium text-base truncate">{item.name}</h3>
              <p className="text-base text-gray-500">{item.price.toLocaleString('tr-TR')} ₺</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-base">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t pt-6 mt-auto">
        <div className="w-full">
          <p className="text-xl font-semibold">Toplam: {total.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="outline" onClick={clearCart} className="flex-1">
            Sepeti Temizle
          </Button>
          <Button className="flex-1" onClick={() => navigate("/dashboard/purchase")}>
            Satın Al
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};