import { ReactNode } from "react";

interface HeaderBadgesProps {
  children?: ReactNode;
  amount: number;
  texte: string;
}

const HeaderBadges = ({ children, amount, texte }: HeaderBadgesProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="badge badge-soft">
        { children }
        { texte }
      </div>

      <div className="stat-value">
        { amount.toFixed(2) } €
      </div>
    </div>
  );
};

export default HeaderBadges;