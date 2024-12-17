import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, ShoppingBag, AlertCircle } from "lucide-react";
import { AdminUserList } from "@/components/admin/AdminUserList";
import { AdminActivityLog } from "@/components/admin/AdminActivityLog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is authenticated and has admin role
  const { data: profile, isLoading } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return profile;
    },
  });

  useEffect(() => {
    if (!isLoading && (!profile || profile.role !== 'admin')) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
      });
      navigate('/dashboard');
    }
  }, [profile, isLoading, navigate, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile || profile.role !== 'admin') {
    return null;
  }

  return (
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
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı kullanıcı sayısı</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcılar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Aktif kullanıcı sayısı</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Günlük Aktivite</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Günlük işlem sayısı</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Raporlar</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
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
  );
};

export default AdminDashboard;
