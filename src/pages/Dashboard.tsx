import { DashboardLayout } from "@/components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to VetMedEx</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;