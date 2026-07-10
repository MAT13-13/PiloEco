import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-3xl border border-green-500/20 bg-white/5 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 ${className}`}
    >
      {children}
    </div>
  );
}