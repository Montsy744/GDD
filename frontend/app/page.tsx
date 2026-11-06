"use client";

import { useEffect, useState } from "react";
import { Transaction } from "./types/Transaction";
import { getAllTransactions } from "./services/TransactionServices";
import toast from "react-hot-toast";
import Header from "./components/sections/header";
import { Activity, Trash, TrendingDown, TrendingUp } from "lucide-react";
import ProgressBar from "./components/sections/progressBar";

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
      <ProgressBar ratio={ratio}/>

      <div className="overflow-x-auto rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            { transactions.map((t, index) => (
              <tr key={t.id}>
                <th>{ index + 1}</th>
                <td>{ t.text }</td>
                <td className="flex font-semibold gap-2 items-center">
                  { t.amount > 0 
                        ? (<TrendingUp className="text-succes w-6 h-6" />)
                        : (<TrendingDown className="text-error w-6 h-6" />)
                  }
                  {
                    t.amount > 0 
                        ? `+${t.amount}`
                        : `-${t.amount}`
                  }
                
                </td>
                <td>{ formatDate(t.created_at) }</td>
                <td>
                  <button 
                    className="btn btn-sm btn-error btn-soft"
                    title="Supprimer"
                  >
                    <Trash className="text-error w-6 h-6" />
                  </button>
                  </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>

    </div>
  );
}