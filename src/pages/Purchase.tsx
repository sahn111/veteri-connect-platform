import { DashboardLayout } from "@/components/DashboardLayout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Package, DollarSign, User, MessageSquare, CreditCard } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Purchase = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { toast } = useToast();
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Ödeme işlemi simülasyonu
    toast({
      title: "Ödeme Başarılı",
      description: "Siparişiniz başarıyla tamamlandı.",
    });
    setIsPaymentOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Satın Alma</h1>
          <p className="text-gray-600">Satın alma işleminizi tamamlayın</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Sipariş Detayları</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Ürün</p>
                      <p className="text-gray-600">Amoksisilin 100 tablet</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Tahmini Teslimat</p>
                      <p className="text-gray-600">3-5 iş günü</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Toplam Tutar</p>
                      <p className="text-gray-600">299.99 ₺</p>
                    </div>
                  </div>
                </div>

                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Ödeme Yap
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Ödeme Bilgileri</DialogTitle>
                      <DialogDescription>
                        Lütfen kart bilgilerinizi güvenli bir şekilde girin.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Kart Numarası</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardHolder">Kart Sahibinin Adı</Label>
                        <Input
                          id="cardHolder"
                          placeholder="Ad Soyad"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Ödemeyi Tamamla
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Satıcı Bilgileri</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Dr. Ayşe Yılmaz</p>
                      <p className="text-gray-600">Merkez Veteriner Kliniği</p>
                      <p className="text-gray-600">İstanbul</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Satıcıyla İletişime Geç
                    </Button>
                    <Link to="/dashboard/marketplace/seller/1">
                      <Button variant="outline" className="w-full">
                        Satıcı Profilini Gör
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Purchase;