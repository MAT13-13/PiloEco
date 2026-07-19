"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";

type AuthMode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function validateForm() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage("Entre ton adresse e-mail.");
      return false;
    }

    if (!cleanEmail.includes("@")) {
      setErrorMessage("Entre une adresse e-mail valide.");
      return false;
    }

    if (!password) {
      setErrorMessage("Entre ton mot de passe.");
      return false;
    }

    if (mode === "signup" && password.length < 6) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return false;
    }

    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const cleanEmail = email.trim().toLowerCase();

      if (mode === "login") {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          });

        if (error) {
          if (
            error.message
              .toLowerCase()
              .includes("invalid login credentials")
          ) {
            setErrorMessage(
              "Adresse e-mail ou mot de passe incorrect."
            );
            return;
          }

          if (
            error.message
              .toLowerCase()
              .includes("email not confirmed")
          ) {
            setErrorMessage(
              "Confirme d’abord ton adresse e-mail avant de te connecter."
            );
            return;
          }

          setErrorMessage(error.message);
          return;
        }

        router.replace("/dashboard");
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        if (
          error.message
            .toLowerCase()
            .includes("already registered")
        ) {
          setErrorMessage(
            "Un compte existe déjà avec cette adresse e-mail."
          );
          return;
        }

        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setSuccessMessage(
        "Ton compte a été créé. Ouvre l’e-mail envoyé par PiloEco pour confirmer ton adresse."
      );

      setMode("login");
      setPassword("");
    } catch (error) {
      console.error(
        "Erreur pendant l’authentification :",
        error
      );

      setErrorMessage(
        "Une erreur inattendue est survenue. Réessaie dans quelques instants."
      );
    } finally {
      setLoading(false);
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-white">
      <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-green-400"
        >
          ← Retour à l’accueil
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
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
                Ton copilote d’économies
              </p>
            </div>
          </div>

          <h1 className="mt-7 text-4xl font-black">
            {mode === "login"
              ? "Bon retour 👋"
              : "Créer mon compte"}
          </h1>

          <p className="mt-3 leading-relaxed text-slate-400">
            {mode === "login"
              ? "Connecte-toi pour retrouver ton analyse, tes missions et tes économies."
              : "Crée gratuitement ton espace pour commencer ton analyse avec Pilo."}
          </p>

          <div className="mt-7 grid grid-cols-2 rounded-2xl border border-white/10 bg-slate-950/60 p-1">
            <button
              type="button"
              onClick={() => changeMode("login")}
              disabled={loading}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                mode === "login"
                  ? "bg-green-500 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Connexion
            </button>

            <button
              type="button"
              onClick={() => changeMode("signup")}
              disabled={loading}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                mode === "signup"
                  ? "bg-green-500 text-slate-950"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Inscription
            </button>
          </div>

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
              placeholder="contact@exemple.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/10"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={loading}
            />

            <div className="mt-5 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-sm font-bold text-slate-300"
              >
                Mot de passe
              </label>

              {mode === "login" && (
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-sm font-bold text-green-400 transition hover:text-green-300"
                >
                  Mot de passe oublié ?
                </Link>
              )}
            </div>

            <input
              id="password"
              type="password"
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
              placeholder={
                mode === "signup"
                  ? "6 caractères minimum"
                  : "Ton mot de passe"
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/10"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={loading}
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
                ? "Chargement..."
                : mode === "login"
                  ? "Se connecter"
                  : "Créer mon compte gratuitement"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
            En créant un compte, tu acceptes les{" "}
            <Link
              href="/cgu"
              className="font-bold text-slate-300 hover:text-green-400"
            >
              CGU
            </Link>{" "}
            et la{" "}
            <Link
              href="/confidentialite"
              className="font-bold text-slate-300 hover:text-green-400"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}