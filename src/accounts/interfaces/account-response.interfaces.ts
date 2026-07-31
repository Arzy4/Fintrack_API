import { Account } from "./account.interfaces";

export interface AccountResponse {
  message: string;
  data: Account;
}