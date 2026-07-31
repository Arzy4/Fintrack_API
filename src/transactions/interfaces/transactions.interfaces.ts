export interface Transaction {
  id: number;
  account_id: number;
  category_id: number;
  type: string;
  amount: number;
  description: string;
  transaction_date: string;
  created_at: string;
}