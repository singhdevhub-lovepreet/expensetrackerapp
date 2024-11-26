export interface ExpenseDto {
  key: number;
  amount: number;
  merchant: string;
  currency: string;
  createdAt: Date;
}