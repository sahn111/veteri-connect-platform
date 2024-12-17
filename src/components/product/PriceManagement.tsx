import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, Percent, ArrowUp, ArrowDown } from "lucide-react";
import { Product, PriceChangeConfig } from "./types";

interface PriceManagementProps {
  product: Product;
  onPriceChange: (product: Product, increase: boolean, config: PriceChangeConfig) => void;
}

export const PriceManagement = ({ product, onPriceChange }: PriceManagementProps) => {
  const [priceChangeAmount, setPriceChangeAmount] = useState<string>("");
  const [isPercentage, setIsPercentage] = useState(true);

  const handlePriceChange = (increase: boolean) => {
    onPriceChange(product, increase, {
      amount: priceChangeAmount,
      isPercentage,
    });
    setPriceChangeAmount("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Fiyat Güncelle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fiyat Güncelleme - {product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant={isPercentage ? "default" : "outline"}
              onClick={() => setIsPercentage(true)}
              className="flex items-center gap-2"
            >
              <Percent className="h-4 w-4" />
              Yüzde
            </Button>
            <Button
              variant={!isPercentage ? "default" : "outline"}
              onClick={() => setIsPercentage(false)}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              Tutar
            </Button>
          </div>
          <div className="space-y-2">
            <Label>
              {isPercentage ? "Yüzde Değeri" : "Tutar"} ({isPercentage ? "%" : "₺"})
            </Label>
            <Input
              type="number"
              min="0"
              step={isPercentage ? "1" : "0.01"}
              value={priceChangeAmount}
              onChange={(e) => setPriceChangeAmount(e.target.value)}
              placeholder={isPercentage ? "Örn: 10" : "Örn: 50.00"}
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => handlePriceChange(true)}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Zam Uygula
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => handlePriceChange(false)}
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              İndirim Uygula
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};