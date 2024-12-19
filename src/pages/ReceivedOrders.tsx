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
import { CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleOrders = [
  {
    id: "1",
    buyer: {
      full_name: "Ahmet Yılmaz",
      email: "ahmet@example.com"
    },
    order_items: [
      {
        medicine: { name: "Vitamin C" },
        quantity: 2
      }
    ],
    total_amount: 150.00,
    created_at: "2024-03-15T10:00:00Z",
    status: "pending"
  },
  {
    id: "2",
    buyer: {
      full_name: "Mehmet Demir",
      email: "mehmet@example.com"
    },
    order_items: [
      {
        medicine: { name: "Aspirin" },
        quantity: 1
      }
    ],
    total_amount: 75.50,
    created_at: "2024-03-14T15:30:00Z",
    status: "shipped"
  },
  {
    id: "3",
    buyer: {
      full_name: "Ayşe Kaya",
      email: "ayse@example.com"
    },
    order_items: [
      {
        medicine: { name: "Parol" },
        quantity: 3
      }
    ],
    total_amount: 225.00,
    created_at: "2024-03-13T09:15:00Z",
    status: "pending"
  }
];

const ReceivedOrders = () => {
  const { toast } = useToast();

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Durum Güncellendi",
      description: `Sipariş durumu güncellendi: ${newStatus}`,
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
              {sampleOrders.map((order) => (
                <TableRow 
                  key={order.id}
                  className={order.status === "pending" ? "animate-blink" : ""}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.buyer.full_name || order.buyer.email}
                  </TableCell>
                  <TableCell>
                    {order.order_items[0]?.medicine?.name}
                  </TableCell>
                  <TableCell>
                    {order.order_items[0]?.quantity}
                  </TableCell>
                  <TableCell>₺{order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={order.status === "shipped" ? "secondary" : "default"}
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