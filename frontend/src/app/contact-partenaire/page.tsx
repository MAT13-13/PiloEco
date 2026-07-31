"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormStatus = "idle" | "loading" | "success" | "error";

type ApiResponse = {
  success?: boolean;
  error?: string;
};

export default function ContactPartenairePage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    const email = "contact@piloeco.com";

    try {
      await navigator.clipboard.writeText(email);

      setEmailCopied(true);

      window.setTimeout(() => {
        setEmailCopied(false);
      }, 2500);
    } catch {
      window.prompt(
        "Copiez cette adresse e-mail :",
        email
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Champ invisible contre les robots.
    const websiteCheck = String(formData.get("website_check") || "");

    if (websiteCheck) {
      setStatus("success");
      form.reset();
      return;
    }

    const payload = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "")
        .trim()
        .toLowerCase(),
      website: String(formData.get("website") || "").trim(),
      partnershipType: String(formData.get("type") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (
      !payload.name ||
      !payload.company ||
      !payload.email ||
      !payload.partnershipType ||
      !payload.message
    ) {
      setStatus("error");
      setErrorMessage("Merci de remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await fetch("/api/contact-partenaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: ApiResponse = {};

      try {
        result = (await response.json()) as ApiResponse;
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Une erreur est survenue pendant l’envoi de votre demande."
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Erreur formulaire partenaire :", error);

      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’envoyer votre demande pour le moment."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/devenir-partenaire"
          className="inline-flex items-center gap-2 font-bold text-emerald-600 transition hover:text-emerald-700"
        >
          <span aria-hidden="true">←</span>
          Retour à la page partenaire
        </Link>

        <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 lg:grid-cols-[0.75fr_1.25fr]">
          {/* COLONNE INFORMATIONS */}
          <aside className="bg-slate-950 p-8 text-white sm:p-10">
            <p className="font-black uppercase tracking-[0.2em] text-emerald-400">
              Partenariat PiloEco
            </p>

            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
              Construisons une collaboration utile aux particuliers.
            </h1>

            <p className="mt-5 leading-8 text-slate-300">
              Présentez-nous votre entreprise, votre offre et le modèle de
              partenariat que vous envisagez.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Étude personnalisée de votre proposition",
                "Échange direct avec l’équipe PiloEco",
                "Conditions définies selon votre activité",
                "Respect des utilisateurs et de leurs données",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-black text-slate-950">
                    ✓
                  </span>

                  <p className="font-semibold text-slate-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-bold text-slate-400">
                Vous préférez nous écrire directement ?
              </p>

              <button
                type="button"
                onClick={copyEmail}
                className="mt-4 w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-left font-black text-emerald-400 transition hover:bg-emerald-500/20 hover:text-emerald-300"
              >
                {emailCopied
                  ? "✅ Adresse copiée !"
                  : "📧 Copier contact@piloeco.com"}
              </button>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Vous pourrez ensuite coller cette adresse dans votre logiciel de
                messagerie.
              </p>
            </div>
          </aside>

          {/* FORMULAIRE */}
          <section className="p-8 sm:p-10 lg:p-12">
            {status === "success" ? (
              <div
                className="flex min-h-[520px] flex-col items-center justify-center text-center"
                role="status"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
                  ✅
                </div>

                <p className="mt-7 font-black uppercase tracking-widest text-emerald-600">
                  Demande transmise
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Merci pour votre proposition
                </h2>

                <p className="mt-4 max-w-lg leading-8 text-slate-600">
                  Votre demande de partenariat a bien été envoyée. L’équipe
                  PiloEco étudiera les informations transmises avant de revenir
                  vers vous.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="rounded-2xl bg-emerald-600 px-6 py-3 font-black text-white transition hover:bg-emerald-700"
                  >
                    Envoyer une autre demande
                  </button>

                  <Link
                    href="/devenir-partenaire"
                    className="rounded-2xl border border-slate-300 px-6 py-3 font-black text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
                  >
                    Retour à la page partenaire
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="font-black uppercase tracking-widest text-emerald-600">
                  Votre proposition
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Présentez votre entreprise
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Les champs marqués d’un astérisque sont obligatoires.
                </p>

                <form onSubmit={handleSubmit} className="mt-9 space-y-6">
                  {/* Champ anti-spam invisible */}
                  <div
                    className="absolute -left-[9999px]"
                    aria-hidden="true"
                  >
                    <label htmlFor="website_check">
                      Ne pas remplir ce champ
                    </label>

                    <input
                      id="website_check"
                      name="website_check"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-bold text-slate-700"
                      >
                        Nom et prénom *
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        placeholder="Votre nom"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block font-bold text-slate-700"
                      >
                        Entreprise *
                      </label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        minLength={2}
                        maxLength={150}
                        autoComplete="organization"
                        placeholder="Nom de l’entreprise"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-bold text-slate-700"
                      >
                        Adresse e-mail professionnelle *
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        autoComplete="email"
                        placeholder="nom@entreprise.com"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="website"
                        className="mb-2 block font-bold text-slate-700"
                      >
                        Site internet
                      </label>

                      <input
                        id="website"
                        name="website"
                        type="url"
                        maxLength={300}
                        autoComplete="url"
                        placeholder="https://www.entreprise.com"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="mb-2 block font-bold text-slate-700"
                    >
                      Type de partenariat envisagé *
                    </label>

                    <select
                      id="type"
                      name="type"
                      required
                      defaultValue=""
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="" disabled>
                        Sélectionnez une proposition
                      </option>

                      <option value="Affiliation">Affiliation</option>

                      <option value="Partenariat direct">
                        Partenariat direct
                      </option>

                      <option value="Distribution d’offres">
                        Distribution d’offres
                      </option>

                      <option value="Commission par vente">
                        Commission par vente
                      </option>

                      <option value="Commission par mise en relation">
                        Commission par mise en relation
                      </option>

                      <option value="Autre proposition">
                        Autre proposition
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-bold text-slate-700"
                    >
                      Présentation de votre proposition *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={8}
                      placeholder="Présentez votre activité, votre offre, votre public cible et le modèle de collaboration envisagé."
                      className="w-full resize-y rounded-2xl border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 accent-emerald-600"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      J’accepte que PiloEco utilise les informations transmises
                      afin d’étudier ma proposition et de me recontacter. Je peux
                      exercer mes droits en écrivant à{" "}
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        contact@piloeco.com
                      </button>
                      . *
                    </span>
                  </label>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-2xl bg-emerald-600 px-6 py-4 font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading"
                      ? "Envoi de la demande..."
                      : "Envoyer ma demande de partenariat"}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    L’envoi de ce formulaire ne garantit pas l’acceptation du
                    partenariat. Chaque proposition est étudiée individuellement.
                  </p>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}