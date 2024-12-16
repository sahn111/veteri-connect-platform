import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="search"
        placeholder="Search medicines..."
        className="pl-10 w-full"
      />
    </div>
  );
};