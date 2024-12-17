import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export const InventoryHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Stok Takibi</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>
                Bu sayfada ilaç stoklarınızı takip edebilirsiniz. Yeni ilaç ekleyebilir,
                mevcut ilaçların stok durumunu güncelleyebilir ve aktif/pasif durumunu
                değiştirebilirsiniz.
              </p>
              <ul className="mt-2 list-disc list-inside">
                <li>İlaç aramak için üst kısımdaki arama kutusunu kullanın</li>
                <li>Yeni ilaç eklemek için sağ üstteki "Yeni Ürün Ekle" butonunu kullanın</li>
                <li>İlaç bilgilerini düzenlemek için ilgili satırdaki düzenleme butonunu kullanın</li>
                <li>İlacın durumunu değiştirmek için aktif/pasif anahtarını kullanın</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button onClick={() => navigate("/dashboard/marketplace/add")}>
        <Package className="mr-2 h-4 w-4" />
        Yeni Ürün Ekle
      </Button>
    </div>
  );
};