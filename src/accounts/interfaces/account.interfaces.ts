import { Prisma } from '@prisma/client';

export interface Account {
  id: number;
  user_id: number;
  name: string;
  type: string;
  balance: Prisma.Decimal | null;
  created_at: Date | null;
}