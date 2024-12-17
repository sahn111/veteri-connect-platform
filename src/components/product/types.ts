export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  unit: string;
  isActive: boolean;
  marketplacePrice?: number;
  isListedInMarketplace?: boolean;
}

export interface PriceChangeConfig {
  amount: string;
  isPercentage: boolean;
}