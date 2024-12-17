export interface Medicine {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  unit: string;
  expiry_date: string;
  is_active: boolean | null;
  seller_id: string;
  seller?: {
    full_name: string | null;
    email: string | null;
  };
  created_at: string;
  updated_at: string;
}