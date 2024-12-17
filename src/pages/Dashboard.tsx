import { DashboardLayout } from "@/components/DashboardLayout";

const Dashboard = () => {
  const helpContent = `
    Ana sayfa panelinde:
    1. Son aktivitelerinizi görebilirsiniz
    2. Hızlı işlemler menüsünden sık kullanılan özelliklere erişebilirsiniz
    3. Sol menüden diğer sayfalara geçiş yapabilirsiniz
  `;

  return (
    <DashboardLayout helpContent={helpContent}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">VetMedEx'e Hoş Geldiniz</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
            <p className="text-gray-600">Gösterilecek aktivite bulunmuyor.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
            <p className="text-gray-600">Yakında eklenecek...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;