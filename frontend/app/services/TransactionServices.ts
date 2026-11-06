import api from "./common/api";
import { Transaction } from "../types/Transaction";


const getAllTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("transactions/");
  return response.data;
};

const deleteTransactionById = async (id: string) => {
  await api.delete(`transactions/${id}/`);
}

const addNewTransaction = async (data: { 
  text: string; 
  amount: number 
}) => {
  const response = await api.post<Transaction>("transactions/", data);
  return response.data;
};


export {
  getAllTransactions,
  deleteTransactionById,
  addNewTransaction
}