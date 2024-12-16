import { DashboardLayout } from "@/components/DashboardLayout";
import { BackButton } from "@/components/BackButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_RECEIVED_ORDERS = [
  {
    id: "ORD001",
    customerName: "Ahmet Yılmaz",
    product: "Amoksisilin",
    quantity: 2,
    total: 599.98,
    status: "pending",
    date: "2024-03-15",
  },
  {
    id: "ORD002",
    customerName: "Mehmet Demir",
    product: "Rimadil",
    quantity: 1,
    total: 459.99,
    status: "shipped",
    date: "2024-03-14",
  },
];

const ReceivedOrders = () => {
  const { toast } = useToast();

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Durum Güncellendi",
      description: `Sipariş ${orderId} için durum güncellendi: ${newStatus}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButton />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Alınan Siparişler</h1>
            <p className="text-muted-foreground">
              Müşterilerinizden gelen siparişleri yönetin
            </p>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Ürün</TableHead>
                <TableHead>Miktar</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_RECEIVED_ORDERS.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₺{order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={order.status === "shipped" ? "success" : "default"}
                    >
                      {order.status === "shipped" ? "Gönderildi" : "Beklemede"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(order.id, "shipped")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Onayla
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(order.id, "cancelled")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            İptal
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceivedOrders;