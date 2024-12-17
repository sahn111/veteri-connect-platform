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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  buyer_id: string;
  status: string;
  total_amount: number;
  created_at: string;
  buyer: {
    full_name: string | null;
    email: string | null;
  };
  order_items: {
    quantity: number;
    medicine: {
      name: string;
    };
  }[];
}

const ReceivedOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['receivedOrders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          buyer:profiles(full_name, email),
          order_items(
            quantity,
            medicine:medicines(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Hata",
          description: "Siparişler yüklenirken bir hata oluştu.",
        });
        throw error;
      }

      return data as Order[];
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receivedOrders'] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Sipariş durumu güncellenirken bir hata oluştu.",
      });
      console.error('Status update error:', error);
    },
  });

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate({ orderId, newStatus });
    toast({
      title: "Durum Güncellendi",
      description: `Sipariş durumu güncellendi: ${newStatus}`,
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

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
              {orders.map((order) => (
                <TableRow 
                  key={order.id}
                  className={order.status === "pending" ? "animate-blink" : ""}
                >
                  <TableCell>{order.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    {order.buyer?.full_name || order.buyer?.email || "İsimsiz Müşteri"}
                  </TableCell>
                  <TableCell>
                    {order.order_items[0]?.medicine.name || "Bilinmeyen Ürün"}
                  </TableCell>
                  <TableCell>
                    {order.order_items[0]?.quantity || 0}
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