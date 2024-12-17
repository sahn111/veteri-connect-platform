import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Activity, Users, ShoppingBag, AlertCircle } from "lucide-react";
import { AdminUserList } from "@/components/admin/AdminUserList";
import { AdminActivityLog } from "@/components/admin/AdminActivityLog";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Paneli</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+5 bu hafta</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Aktif İlanlar</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+12 bu ay</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Günlük Aktivite</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">%15 artış</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Raporlar</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">İncelenmesi gereken</p>
            </CardContent>
          </Card>
        </div>

        {/* User List Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Listesi</h2>
          <AdminUserList />
        </div>

        {/* Activity Log Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Aktivite Geçmişi</h2>
          <AdminActivityLog />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;