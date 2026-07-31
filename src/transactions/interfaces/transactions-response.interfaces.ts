import { Transaction } from "./transactions.interfaces";

export interface TransactionResponse {
    message: string;
    data: Transaction;
}