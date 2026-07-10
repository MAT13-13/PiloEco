import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "premium";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: Props) {
  const classes = {
    primary:
      "bg-green-500 text-slate-950 hover:bg-green-400 shadow-[0_0_25px_rgba(34,197,94,0.25)]",

    secondary:
      "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",

    premium:
      "bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20",
  };

  const style = `inline-flex items-center justify-center rounded-2xl px-6 py-3 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${classes[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={style}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
}