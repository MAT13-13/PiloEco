import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function PiloButton({
  children,
  href,
  onClick,
  variant = "primary",
}: Props) {
  const classes =
    variant === "primary"
      ? "bg-green-500 text-slate-950 hover:bg-green-400"
      : "bg-slate-800 text-white hover:bg-slate-700";

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 font-bold transition-all duration-300 hover:scale-105 ${classes}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 font-bold transition-all duration-300 hover:scale-105 ${classes}`}
    >
      {children}
    </button>
  );
}