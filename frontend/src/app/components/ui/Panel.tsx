import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Panel({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`rounded-3xl border border-green-500/20 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-green-500/40 ${className}`}
    >
      {children}
    </section>
  );
}