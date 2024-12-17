import { DashboardLayout } from "@/components/DashboardLayout";
import { ProductManagementList } from "@/components/product/ProductManagementList";

const ManageProducts = () => {
  return (
    <DashboardLayout helpContent="Bu sayfada satışını yaptığınız ürünleri yönetebilir, fiyatlarını güncelleyebilir ve indirim/zam uygulayabilirsiniz.">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
        <ProductManagementList />
      </div>
    </DashboardLayout>
  );
};

export default ManageProducts;