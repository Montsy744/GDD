"use client";

import { useEffect, useState } from "react";
import { Transaction } from "./types/Transaction";
import { getAllTransactions } from "./services/TransactionServices";
import toast from "react-hot-toast";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import Header from "./components/sections/header";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted : boolean = true;

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

  const amounts : number[] = transactions.map((t) => Number(t.amount) || 0);
  const balance : number = amounts.reduce((acc, item) => acc +item, 0) || 0;
  const income : number = amounts.filter((amount) => amount > 0).reduce((acc, item) => acc +item, 0) || 0;
  const expense : number = amounts.filter((amount) => amount < 0).reduce((acc, item) => acc +item, 0) || 0;

  const ratio : number = income > 0
                  ? Math.min((Math.abs(expense) / income) * 100, 100)
                  : 0;

  if (isLoading) return <div>Chargement...</div>;

  const formatDate = (dateString : string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("fr-Fr", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="w-2/3 flex flex-col gap-4">
      <Header balance={ balance } income={ income } expense={ expense } />

    </div>
  );
}