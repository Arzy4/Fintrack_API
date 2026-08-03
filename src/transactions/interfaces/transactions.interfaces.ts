import { Prisma } from '@prisma/client';

export interface Transaction {
  id: number;
  account_id: number;
  category_id: number;
  type: string;
  amount: Prisma.Decimal;
  description: string | null;
  transaction_date: Date;
  created_at: Date | null;
}