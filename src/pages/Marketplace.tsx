import { DashboardLayout } from "@/components/DashboardLayout";
import { MedicineList } from "@/components/MedicineList";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Marketplace = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            List Medicine
          </Button>
        </div>
        
        <SearchBar />
        <MedicineList />
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;