import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InventorySearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const InventorySearch = ({ searchTerm, setSearchTerm }: InventorySearchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Search className="w-4 h-4 text-gray-500" />
      <Input
        placeholder="İlaç ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};