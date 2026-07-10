import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageContainer({ children, className = "" }: Props) {
  return (
    <main className={`min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:ml-64 lg:px-8 ${className}`}>
      <section className="mx-auto w-full max-w-[1500px]">
        {children}
      </section>
    </main>
  );
}