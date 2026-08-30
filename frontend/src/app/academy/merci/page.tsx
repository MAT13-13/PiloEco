import Link from "next/link";

export default function AcademyMerciPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] px-5 py-16 text-slate-950">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-emerald-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          ✓
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
          Pilo Academy
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#063f31] md:text-4xl">
          Merci pour ta commande 🎓
        </h1>

        <p className="mx-auto mt-5 max-w-lg leading-7 text-slate-500">
          Ton paiement a bien été transmis. Ton guide va être envoyé à
          l&apos;adresse e-mail utilisée lors du paiement.
        </p>

        <div className="mt-7 rounded-2xl bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
          Pense à vérifier tes courriers indésirables si tu ne vois pas
          l&apos;e-mail Pilo Academy dans ta boîte de réception.
        </div>

        <Link
          href="/academy"
          className="mt-8 inline-flex rounded-2xl bg-emerald-600 px-6 py-4 font-black text-white transition hover:bg-emerald-500"
        >
          Retour à Pilo Academy
        </Link>
      </div>
    </main>
  );
}
