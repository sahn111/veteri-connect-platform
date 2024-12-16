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
import { Package, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_PLACED_ORDERS = [
  {
    id: "ORD003",
    seller: {
      id: 1,
      name: "Dr. Ayşe Yılmaz",
      clinic: "Merkez Veteriner Kliniği",
    },
    product: "Frontline Plus",
    quantity: 3,
    total: 1079.97,
    status: "processing",
    date: "2024-03-15",
  },
  {
    id: "ORD004",
    seller: {
      id: 2,
      name: "Dr. Mehmet Demir",
      clinic: "Hayat Veteriner Kliniği",
    },
    product: "Rimadil",
    quantity: 1,
    total: 459.99,
    status: "delivered",
    date: "2024-03-10",
  },
];

const PlacedOrders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButton />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Verilen Siparişler</h1>
            <p className="text-muted-foreground">
              Verdiğiniz siparişleri takip edin
            </p>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Satıcı</TableHead>
                <TableHead>Ürün</TableHead>
                <TableHead>Miktar</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PLACED_ORDERS.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/marketplace/seller/${order.seller.id}`}
                      className="hover:underline"
                    >
                      {order.seller.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {order.seller.clinic}
                    </div>
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₺{order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "secondary"
                          : order.status === "processing"
                          ? "default"
                          : "outline"
                      }
                    >
                      {order.status === "delivered"
                        ? "Teslim Edildi"
                        : order.status === "processing"
                        ? "İşleniyor"
                        : "Hazırlanıyor"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/messages`}>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Mesaj Gönder
                      </Button>
                    </Link>
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

export default PlacedOrders;