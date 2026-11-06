import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react"
import HeaderBadges from "../headerBadges"

interface HeaderProps {
    balance: number,
    income: number,
    expense: number
}

const Header = ({balance, income, expense}: HeaderProps) => {
    return (
         <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">

            <HeaderBadges amount={balance} texte={"Votre solde"}>
                <Wallet className="w-4 h-4"/>
            </HeaderBadges>

            <HeaderBadges amount={income} texte={"Revenus"}>
                <ArrowUpCircle className="w-4 h-4"/>
            </HeaderBadges>

            <HeaderBadges amount={expense} texte={"Dépenses"}>
                <ArrowDownCircle className="w-4 h-4"/>
            </HeaderBadges>

      </div>
    )
}

export default Header;