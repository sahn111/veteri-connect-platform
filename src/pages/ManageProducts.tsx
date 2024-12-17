import { DashboardLayout } from "@/components/DashboardLayout";
import { ProductManagementList } from "@/components/product/ProductManagementList";

const ManageProducts = () => {
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
        <ProductManagementList />
      </div>
    </DashboardLayout>
  );
};

export default ManageProducts;