import api from "./common/api";
import { Transaction } from "../types/Transaction";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("transactions/");
  return response.data;
};