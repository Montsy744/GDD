"use client";

import { useEffect, useState } from "react";
import { Transaction } from "./types/Transaction";
import { getAllTransactions } from "./services/TransactionServices";
import toast from "react-hot-toast";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTransactions();
        if (isMounted) {
          setTransactions(data);
          toast.success("Transactions chargées");
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Erreur lors du chargement des transactions");
          console.error("Erreur lors du chargement des transactions", error)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>{/* Rendu de votre transaction */}</li>
        ))}
      </ul>
    </main>
  );
}