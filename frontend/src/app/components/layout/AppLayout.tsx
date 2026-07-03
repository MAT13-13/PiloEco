import Sidebar from "../Sidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Sidebar />

      <main className="min-h-screen bg-slate-950 text-white p-6 lg:ml-64">
        <section className="mx-auto w-full max-w-6xl">
          {children}
        </section>
      </main>
    </>
  );
}