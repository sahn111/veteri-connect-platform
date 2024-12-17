import { Tables } from "@/integrations/supabase/types";

export type InventoryItem = Tables<"inventory">;

export interface PriceChangeConfig {
  amount: string;
  isPercentage: boolean;
}