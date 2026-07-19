"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

export default function NouveauMotDePassePage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères."
      );
      return;
    }

    if (password !== confirmation) {
      setErrorMessage(
        "Les deux mots de passe ne correspondent pas."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        throw error;
      }

      setSuccessMessage(
        "Ton mot de passe a bien été modifié."
      );

      window.setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (error) {
      console.error(
        "Erreur modification mot de passe :",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de modifier le mot de passe."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-white">
      <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img
              src="/pilo.png"
              alt="PiloEco"
              className="h-14 w-14 object-contain"
            />

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
              PiloEco
            </p>
          </div>

          <h1 className="mt-7 text-4xl font-black">
            Nouveau mot de passe
          </h1>

          <p className="mt-3 leading-relaxed text-slate-400">
            Choisis un nouveau mot de passe sécurisé
            pour ton compte.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7"
          >
            <label
              htmlFor="password"
              className="text-sm font-bold text-slate-300"
            >
              Nouveau mot de passe
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={loading}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400"
            />

            <label
              htmlFor="confirmation"
              className="mt-5 block text-sm font-bold text-slate-300"
            >
              Confirmer le mot de passe
            </label>

            <input
              id="confirmation"
              type="password"
              autoComplete="new-password"
              placeholder="Confirme ton mot de passe"
              value={confirmation}
              onChange={(event) =>
                setConfirmation(event.target.value)
              }
              disabled={loading}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400"
            />

            {errorMessage && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-300">
                ❌ {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mt-5 rounded-2xl border border-green-400/20 bg-green-500/10 px-5 py-4 text-sm font-bold text-green-300">
                ✅ {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 transition hover:bg-green-400 disabled:opacity-60"
            >
              {loading
                ? "Modification..."
                : "Enregistrer le nouveau mot de passe"}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-6 block text-center text-sm font-bold text-slate-400 transition hover:text-green-400"
          >
            Retour à la connexion
          </Link>
        </section>
      </div>
    </main>
  );
}