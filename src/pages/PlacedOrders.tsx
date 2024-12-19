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
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const sampleOrders = [
  {
    id: "ord1",
    seller: {
      id: "sel1",
      full_name: "Eczane A",
      email: "eczanea@example.com"
    },
    order_items: [
      {
        id: "item1",
        medicine: { name: "Vitamin D" },
        quantity: 2
      }
    ],
    total_amount: 180.00,
    created_at: "2024-03-15T10:00:00Z",
    status: "processing"
  },
  {
    id: "ord2",
    seller: {
      id: "sel2",
      full_name: "Eczane B",
      email: "eczaneb@example.com"
    },
    order_items: [
      {
        id: "item2",
        medicine: { name: "Magnezyum" },
        quantity: 1
      }
    ],
    total_amount: 95.50,
    created_at: "2024-03-14T15:30:00Z",
    status: "delivered"
  },
  {
    id: "ord3",
    seller: {
      id: "sel3",
      full_name: "Eczane C",
      email: "eczanec@example.com"
    },
    order_items: [
      {
        id: "item3",
        medicine: { name: "B12 Vitamini" },
        quantity: 3
      }
    ],
    total_amount: 275.00,
    created_at: "2024-03-13T09:15:00Z",
    status: "processing"
  }
];

const PlacedOrders = () => {
  const helpContent = `
    Verilen Siparişler sayfasında:
    1. Tüm siparişlerinizi tarih sırasıyla görebilirsiniz
    2. Sipariş durumunu takip edebilirsiniz
    3. Satıcıyla mesajlaşabilirsiniz
    4. Satıcı profiline gidebilirsiniz
    5. Sipariş detaylarını görüntüleyebilirsiniz
  `;

  return (
    <DashboardLayout helpContent={helpContent}>
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
                <TableHead>Ürünler</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <Link
                      to={`/dashboard/marketplace/seller/${order.seller.id}`}
                      className="hover:underline"
                    >
                      {order.seller.full_name || order.seller.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {order.order_items.map((item) => (
                      <div key={item.id}>
                        {item.medicine.name} x {item.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>₺{order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
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