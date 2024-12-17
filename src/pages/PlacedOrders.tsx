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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PlacedOrders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['placed-orders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          seller:profiles!orders_seller_id_fkey (
            id,
            full_name,
            email
          ),
          order_items (
            *,
            medicine:medicines (
              name
            )
          )
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      return ordersData;
    },
  });

  const helpContent = `
    Verilen Siparişler sayfasında:
    1. Tüm siparişlerinizi tarih sırasıyla görebilirsiniz
    2. Sipariş durumunu takip edebilirsiniz
    3. Satıcıyla mesajlaşabilirsiniz
    4. Satıcı profiline gidebilirsiniz
    5. Sipariş detaylarını görüntüleyebilirsiniz
  `;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div>Yükleniyor...</div>
      </DashboardLayout>
    );
  }

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
              {orders?.map((order) => (
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