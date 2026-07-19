"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { supabase } from "../lib/supabase";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMessage(
        "Entre une adresse e-mail valide."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo: `${window.location.origin}/nouveau-mot-de-passe`,
          }
        );

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Un e-mail de réinitialisation vient de t’être envoyé. Pense à vérifier tes courriers indésirables."
      );
    } catch (error) {
      console.error(
        "Erreur de réinitialisation :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’envoyer l’e-mail."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-white">
      <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-green-400"
        >
          ← Retour à la connexion
        </Link>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img
              src="/pilo.png"
              alt="PiloEco"
              className="h-14 w-14 object-contain"
            />

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
                PiloEco
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Récupération du compte
              </p>
            </div>
          </div>

          <h1 className="mt-7 text-4xl font-black">
            Mot de passe oublié ?
          </h1>

          <p className="mt-3 leading-relaxed text-slate-400">
            Entre ton adresse e-mail. PiloEco
            t’enverra un lien pour choisir un nouveau
            mot de passe.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7"
          >
            <label
              htmlFor="email"
              className="text-sm font-bold text-slate-300"
            >
              Adresse e-mail
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tonadresse@email.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={loading}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/10"
            />

            {errorMessage && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-300">
                ❌ {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mt-5 rounded-2xl border border-green-400/20 bg-green-500/10 px-5 py-4 text-sm font-bold leading-relaxed text-green-300">
                ✅ {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Envoi..."
                : "Recevoir le lien de réinitialisation"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}