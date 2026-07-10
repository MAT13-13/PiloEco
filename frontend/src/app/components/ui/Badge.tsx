import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "green" | "purple" | "slate";
};

export default function Badge({ children, variant = "green" }: Props) {
  const variants = {
    green: "border-green-500/30 bg-green-500/10 text-green-300",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    slate: "border-slate-700 bg-slate-900 text-slate-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}