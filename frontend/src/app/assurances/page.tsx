import Link from "next/link";

export default function AssurancesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/dashboard" className="text-green-400 hover:text-green-300">
          ← Retour au dashboard
        </Link>

        <section className="mt-10 rounded-3xl border border-green-500/30 bg-slate-900 p-8">
          <p className="text-sm font-bold uppercase text-green-400">
            🛡️ Assurances
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Toutes tes assurances au même endroit
          </h1>

          <p className="mt-5 text-lg text-slate-300">
            Pilo pourra bientôt surveiller tes assurances habitation, auto,
            animaux, santé et détecter les économies possibles.
          </p>

          <div className="mt-8 rounded-2xl bg-yellow-500/10 p-6 text-yellow-300">
            🟡 Module en préparation.
          </div>
        </section>
      </div>
    </main>
  );
}