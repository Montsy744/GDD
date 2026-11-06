import { ReactNode } from "react";
import { BadgeVariant } from "../types/BadgeVariant";

interface HeaderBadgesProps {
  children?: ReactNode;
  amount: number;
  texte: string;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "badge-soft",
  success: "badge-success badge-soft",
  error: "badge-error badge-soft",
};

const HeaderBadges = ({
  children,
  amount,
  texte,
  variant = "default",
}: HeaderBadgesProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className={`badge badge-soft ${variantClasses[variant]}`}>
        {children}
        {texte}
      </div>

      <div className="stat-value">
        {amount.toFixed(2)} €
      </div>
    </div>
  );
};

export default HeaderBadges;