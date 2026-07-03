import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PiloPanel({ children, className = "" }: Props) {
  return (
    <section
      className={`rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30 ${className}`}
    >
      {children}
    </section>
  );
}