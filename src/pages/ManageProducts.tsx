import { DashboardLayout } from "@/components/DashboardLayout";
import { ProductManagementList } from "@/components/product/ProductManagementList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ManageProducts = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile;
    },
  });

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('owner_id', user.id)
        .order('name');

      if (error) throw error;
      return data;
    },
    enabled: !!profile,
  });

  const helpContent = `
    Bu sayfada:
    1. Stoğunuzdaki ürünleri pazar yerinde listeleyebilirsiniz
    2. Pazar yeri fiyatlarını güncelleyebilirsiniz
    3. İndirim veya zam uygulayabilirsiniz
    4. Ürünleri pazar yerinden kaldırabilirsiniz
  `;

  return (
    <DashboardLayout helpContent={helpContent}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
        <ProductManagementList inventory={inventory || []} />
      </div>
    </DashboardLayout>
  );
};

export default ManageProducts;