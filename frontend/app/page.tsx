"use client";

import { useEffect, useState } from "react";
import { Transaction } from "./types/Transaction";
import { addNewTransaction, deleteTransactionById, getAllTransactions } from "./services/TransactionServices";
import toast from "react-hot-toast";
import Header from "./components/sections/header";
import { PlusCircle, Trash, TrendingDown, TrendingUp } from "lucide-react";
import ProgressBar from "./components/sections/progressBar";
import { Plus } from "lucide";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTransactions = async (isMounted = true) => {
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
        console.error("Erreur lors du chargement des transactions", error);
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await deleteTransactionById(id);
      fetchTransactions();
      toast.success("Transaction supprimer avec succés");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la transaction");
      console.error("Erreur lors de la suppression de la transaction", error);
    }
  };

  const addTransaction = async () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement

    if(!text || amount == "" || isNaN(Number(amount))) {
      if(modal){
        modal.close()
      }
      toast.error("Merci de remplir texte et amount valide")
      return
    }
    setIsLoading(true)
    try {
      const res = await addNewTransaction({
        text,
        amount: Number(amount)
      })

      fetchTransactions();

      if(modal){
        modal.close()
      }

      toast.success("Transaction ajouter avec succés");

      setText("")
      setAmount("")
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la transaction");
      console.error("Erreur lors de l'ajout de la transaction", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted: boolean = true;

    fetchTransactions(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  const amounts: number[] = transactions.map((t) => Number(t.amount) || 0);
  const balance: number = amounts.reduce((acc, item) => acc + item, 0) || 0;
  const income: number = amounts.filter((amount) => amount > 0).reduce((acc, item) => acc + item, 0) || 0;
  const expense: number = amounts.filter((amount) => amount < 0).reduce((acc, item) => acc + item, 0) || 0;

  const ratio: number = income > 0
                  ? Math.min((Math.abs(expense) / income) * 100, 100)
                  : 0;

  if (isLoading) return <div>Chargement...</div>;

  const formatDate = (dateString: string) => {
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

      
      <button 
        className="btn btn-warning" 
        onClick={()=> (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}
        >
          <PlusCircle className="w-4 h-4" />
          Ajouter une transaction
      </button>

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
                    onClick={ () => deleteTransaction(t.id) }
                  >
                    <Trash className="text-error w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>


      <dialog id="my_modal_3" className="modal backdrop-blur">
        <div className="modal-box border-2 border-warning/10 border-dashed">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Ajouter une transaction</h3>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="label">Texte</label>
              <input 
                type="text" 
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Entrez le texte ..."
                className="input w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label">Montant</label>
              <input 
                type="number" 
                name="montant"
                value={amount}
                onChange={(e) => setAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )}
                placeholder="Entrez le montant ..."
                className="input w-full"
              />
            </div>

            <button 
              className="w-full btn btn-warning"
              type="button"
              onClick={addTransaction}
              disabled={isLoading}
            >
              <PlusCircle className="w-4 h-4" />
              Ajouter
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
}