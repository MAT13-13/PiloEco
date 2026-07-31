"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

export default function NouveauMotDePassePage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [checkingLink, setCheckingLink] = useState(true);
  const [linkValid, setLinkValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) {
          return;
        }

        if (
          event === "PASSWORD_RECOVERY" ||
          session?.user
        ) {
          setLinkValid(true);
          setCheckingLink(false);
        }
      }
    );

    async function checkRecoverySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (session?.user) {
        setLinkValid(true);
      }

      setCheckingLink(false);
    }

    void checkRecoverySession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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

      const { error } = await supabase.auth.updateUser({
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
      }, 1800);
    } catch (error) {
      console.error(
        "Erreur de modification du mot de passe :",
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

  if (checkingLink) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="text-center">
          <p className="text-5xl">🔐</p>

          <h1 className="mt-4 text-2xl font-black">
            Vérification du lien...
          </h1>

          <p className="mt-3 text-slate-400">
            Pilo vérifie ton lien de récupération.
          </p>
        </div>
      </main>
    );
  }

  if (!linkValid) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
        <section className="w-full max-w-md rounded-[2rem] border border-red-400/20 bg-slate-900 p-8 text-center shadow-2xl">
          <p className="text-5xl">❌</p>

          <h1 className="mt-5 text-3xl font-black">
            Lien invalide ou expiré
          </h1>

          <p className="mt-4 leading-relaxed text-slate-400">
            Demande un nouveau lien pour modifier ton mot de
            passe.
          </p>

          <Link
            href="/mot-de-passe-oublie"
            className="mt-7 inline-flex rounded-2xl bg-green-500 px-6 py-4 font-black text-slate-950 transition hover:bg-green-400"
          >
            Recevoir un nouveau lien
          </Link>
        </section>
      </main>
    );
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

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
                PiloEco
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Sécurisation du compte
              </p>
            </div>
          </div>

          <h1 className="mt-7 text-4xl font-black">
            Nouveau mot de passe
          </h1>

          <p className="mt-3 leading-relaxed text-slate-400">
            Choisis un nouveau mot de passe pour ton compte.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <div>
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
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={loading}
                required
                minLength={8}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="confirmation"
                className="text-sm font-bold text-slate-300"
              >
                Confirme le nouveau mot de passe
              </label>

              <input
                id="confirmation"
                type="password"
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) =>
                  setConfirmation(event.target.value)
                }
                disabled={loading}
                required
                minLength={8}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            {errorMessage && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-300">
                ❌ {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="rounded-2xl border border-green-400/20 bg-green-500/10 px-5 py-4 text-sm font-bold text-green-300">
                ✅ {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Modification..."
                : "Modifier mon mot de passe"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}