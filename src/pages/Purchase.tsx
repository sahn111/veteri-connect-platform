import { DashboardLayout } from "@/components/DashboardLayout";
import { useCart } from "@/components/cart/CartProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Package, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Purchase = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/dashboard/marketplace");
    }
  }, [items.length, navigate]);

  const handlePurchase = () => {
    setLoading(true);
    // Simulate purchase process
    setTimeout(() => {
      toast.success("Siparişiniz başarıyla tamamlandı!");
      clearCart();
      navigate("/dashboard/marketplace");
    }, 2000);
  };

  if (items.length === 0) return null;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sipariş Özeti */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Sipariş Özeti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Miktar: {item.quantity} {item.unit}
                        </p>
                      </div>
                      <p className="font-medium">
                        {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Teslimat Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Teslimat Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Ad Soyad" />
                    <Input placeholder="Telefon" />
                    <Input placeholder="E-posta" className="md:col-span-2" />
                    <Input placeholder="Adres" className="md:col-span-2" />
                    <Input placeholder="İl" />
                    <Input placeholder="İlçe" />
                  </div>
                </CardContent>
              </Card>

              {/* Ödeme Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Ödeme Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Kart Üzerindeki İsim" className="md:col-span-2" />
                    <Input placeholder="Kart Numarası" className="md:col-span-2" />
                    <Input placeholder="Son Kullanma Tarihi (AA/YY)" />
                    <Input placeholder="CVV" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sipariş Toplamı */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Sipariş Toplamı</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Ara Toplam</span>
                      <span>{total.toLocaleString("tr-TR")} ₺</span>
                    </div>
                    <div className="flex justify-between">
                      <span>KDV (%18)</span>
                      <span>
                        {(total * 0.18).toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                      <span>Toplam</span>
                      <span>
                        {(total * 1.18).toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePurchase}
                    disabled={loading}
                  >
                    {loading ? "İşleniyor..." : "Siparişi Tamamla"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Purchase;