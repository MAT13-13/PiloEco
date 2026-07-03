"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Compte créé ! Vérifie tes emails si Supabase demande confirmation.");
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-4 text-4xl font-black">
          Connexion
        </h1>

        <p className="mt-3 text-slate-400">
          Connecte-toi pour retrouver ton analyse et tes économies.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="mt-8 w-full rounded-2xl bg-white p-4 font-bold text-slate-950"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="mt-4 w-full rounded-2xl bg-white p-4 font-bold text-slate-950"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-2xl bg-green-500 py-4 font-black text-slate-950 hover:bg-green-400"
        >
          Se connecter
        </button>

        <button
          onClick={handleSignup}
          className="mt-4 w-full rounded-2xl border border-white/10 py-4 font-black text-white hover:bg-white/10"
        >
          Créer un compte
        </button>
      </div>
    </main>
  );
}