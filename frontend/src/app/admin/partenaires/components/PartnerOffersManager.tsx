"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

const categories = [
  "mobile",
  "internet",
  "assurance",
  "electricite",
  "habitation",
  "animaux",
  "banque",
  "mobilite",
  "streaming",
] as const;

type Props = {
  partnerRequestId: string;
};

type PartnerOffer = {
  id: string;
  partner_id: string;
  offer_name: string;
  provider: string;
  category: string;
  monthly_price: number;
  url: string;
  network: string | null;
  data_amount: string | null;
  commitment: string | null;
  score: number | null;
  is_active: boolean;
  is_featured: boolean;
};

export default function PartnerOffersManager({
  partnerRequestId,
}: Props) {
  const [partnerProfileId, setPartnerProfileId] =
    useState<string | null>(null);

  const [offers, setOffers] = useState<PartnerOffer[]>([]);

  const [editingOfferId, setEditingOfferId] = useState<
    string | null
  >(null);

  const [offerName, setOfferName] = useState("");
  const [provider, setProvider] = useState("");
  const [category, setCategory] = useState("mobile");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [url, setUrl] = useState("");
  const [network, setNetwork] = useState("");
  const [dataAmount, setDataAmount] = useState("");
  const [commitment, setCommitment] = useState("");
  const [score, setScore] = useState("");
  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingOfferId, setChangingOfferId] = useState<
    string | null
  >(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function resetForm() {
    setEditingOfferId(null);
    setOfferName("");
    setProvider("");
    setCategory("mobile");
    setMonthlyPrice("");
    setUrl("");
    setNetwork("");
    setDataAmount("");
    setCommitment("");
    setScore("");
    setFeatured(false);
  }

  async function reloadOffers(partnerId: string) {
    const { data, error } = await supabase
      .from("partner_offers")
      .select(`
        id,
        partner_id,
        offer_name,
        provider,
        category,
        monthly_price,
        url,
        network,
        data_amount,
        commitment,
        score,
        is_active,
        is_featured
      `)
      .eq("partner_id", partnerId)
      .order("is_featured", {
        ascending: false,
      })
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    setOffers((data ?? []) as PartnerOffer[]);
  }

  useEffect(() => {
    let mounted = true;

    async function loadPartnerAndOffers() {
      try {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        resetForm();

        const { data: profile, error: profileError } =
          await supabase
            .from("partner_profiles")
            .select("id")
            .eq("partner_request_id", partnerRequestId)
            .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        if (!mounted) {
          return;
        }

        if (!profile) {
          setPartnerProfileId(null);
          setOffers([]);
          return;
        }

        setPartnerProfileId(profile.id);

        const { data: partnerOffers, error: offersError } =
          await supabase
            .from("partner_offers")
            .select(`
              id,
              partner_id,
              offer_name,
              provider,
              category,
              monthly_price,
              url,
              network,
              data_amount,
              commitment,
              score,
              is_active,
              is_featured
            `)
            .eq("partner_id", profile.id)
            .order("is_featured", {
              ascending: false,
            })
            .order("created_at", {
              ascending: false,
            });

        if (offersError) {
          throw offersError;
        }

        if (!mounted) {
          return;
        }

        setOffers(
          (partnerOffers ?? []) as PartnerOffer[]
        );
      } catch (error) {
        console.error(
          "Erreur chargement des offres :",
          error
        );

        if (mounted) {
          setErrorMessage(
            "Impossible de charger les offres du partenaire."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadPartnerAndOffers();

    return () => {
      mounted = false;
    };
  }, [partnerRequestId]);

  function handleEditOffer(offer: PartnerOffer) {
    setEditingOfferId(offer.id);
    setOfferName(offer.offer_name);
    setProvider(offer.provider);
    setCategory(offer.category);
    setMonthlyPrice(
      Number(offer.monthly_price).toString()
    );
    setUrl(offer.url);
    setNetwork(offer.network ?? "");
    setDataAmount(offer.data_amount ?? "");
    setCommitment(offer.commitment ?? "");
    setScore(
      offer.score === null
        ? ""
        : offer.score.toString()
    );
    setFeatured(offer.is_featured);

    setErrorMessage("");
    setSuccessMessage("");

    window.setTimeout(() => {
      document
        .getElementById("partner-offer-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  async function handleSaveOffer() {
    if (!partnerProfileId) {
      setErrorMessage(
        "Le profil partenaire n’existe pas encore."
      );
      return;
    }

    const parsedPrice = Number(monthlyPrice);
    const parsedScore =
      score === "" ? null : Number(score);

    if (
      !offerName.trim() ||
      !provider.trim() ||
      !url.trim()
    ) {
      setErrorMessage(
        "Renseigne le nom, le fournisseur et l’URL de l’offre."
      );
      return;
    }

    if (
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      setErrorMessage(
        "Le prix mensuel doit être un nombre valide."
      );
      return;
    }

    if (
      parsedScore !== null &&
      (!Number.isFinite(parsedScore) ||
        parsedScore < 0 ||
        parsedScore > 100)
    ) {
      setErrorMessage(
        "Le score Pilo doit être compris entre 0 et 100."
      );
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const offerValues = {
        partner_id: partnerProfileId,
        category,
        provider: provider.trim(),
        offer_name: offerName.trim(),
        monthly_price: parsedPrice,
        url: url.trim(),
        network: network.trim() || null,
        data_amount: dataAmount.trim() || null,
        commitment: commitment.trim() || null,
        score: parsedScore,
        is_featured: featured,
      };

      if (editingOfferId) {
        const { error } = await supabase
          .from("partner_offers")
          .update(offerValues)
          .eq("id", editingOfferId)
          .eq("partner_id", partnerProfileId);

        if (error) {
          throw error;
        }

        setSuccessMessage(
          "✅ L’offre a bien été modifiée."
        );
      } else {
        const { error } = await supabase
          .from("partner_offers")
          .insert({
            ...offerValues,
            is_active: true,
          });

        if (error) {
          throw error;
        }

        setSuccessMessage(
          "✅ La nouvelle offre a bien été créée."
        );
      }

      await reloadOffers(partnerProfileId);
      resetForm();
    } catch (error) {
      console.error(
        "Erreur enregistrement offre :",
        error
      );

      setErrorMessage(
        editingOfferId
          ? "Impossible de modifier l’offre."
          : "Impossible d’enregistrer l’offre."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(
    offer: PartnerOffer
  ) {
    if (!partnerProfileId) {
      return;
    }

    try {
      setChangingOfferId(offer.id);
      setErrorMessage("");
      setSuccessMessage("");

      const { error } = await supabase
        .from("partner_offers")
        .update({
          is_active: !offer.is_active,
        })
        .eq("id", offer.id)
        .eq("partner_id", partnerProfileId);

      if (error) {
        throw error;
      }

      await reloadOffers(partnerProfileId);

      setSuccessMessage(
        offer.is_active
          ? "⏸ L’offre a été désactivée."
          : "▶ L’offre a été activée."
      );
    } catch (error) {
      console.error(
        "Erreur activation offre :",
        error
      );

      setErrorMessage(
        "Impossible de modifier l’état de l’offre."
      );
    } finally {
      setChangingOfferId(null);
    }
  }

  async function handleToggleFeatured(
    offer: PartnerOffer
  ) {
    if (!partnerProfileId) {
      return;
    }

    try {
      setChangingOfferId(offer.id);
      setErrorMessage("");
      setSuccessMessage("");

      const { error } = await supabase
        .from("partner_offers")
        .update({
          is_featured: !offer.is_featured,
        })
        .eq("id", offer.id)
        .eq("partner_id", partnerProfileId);

      if (error) {
        throw error;
      }

      await reloadOffers(partnerProfileId);

      setSuccessMessage(
        offer.is_featured
          ? "L’offre n’est plus mise en avant."
          : "⭐ L’offre est maintenant mise en avant."
      );
    } catch (error) {
      console.error(
        "Erreur mise en avant offre :",
        error
      );

      setErrorMessage(
        "Impossible de modifier la mise en avant."
      );
    } finally {
      setChangingOfferId(null);
    }
  }

  async function handleDeleteOffer(
    offer: PartnerOffer
  ) {
    if (!partnerProfileId) {
      return;
    }

    const confirmed = window.confirm(
      `Supprimer définitivement l’offre « ${offer.offer_name} » ?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setChangingOfferId(offer.id);
      setErrorMessage("");
      setSuccessMessage("");

      const { error } = await supabase
        .from("partner_offers")
        .delete()
        .eq("id", offer.id)
        .eq("partner_id", partnerProfileId);

      if (error) {
        throw error;
      }

      setOffers((currentOffers) =>
        currentOffers.filter(
          (currentOffer) =>
            currentOffer.id !== offer.id
        )
      );

      if (editingOfferId === offer.id) {
        resetForm();
      }

      setSuccessMessage(
        "🗑 L’offre a bien été supprimée."
      );
    } catch (error) {
      console.error(
        "Erreur suppression offre :",
        error
      );

      setErrorMessage(
        "Impossible de supprimer l’offre."
      );
    } finally {
      setChangingOfferId(null);
    }
  }

  return (
    <section className="mt-8 border-t border-slate-200 pt-6">
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
        🎁 Offres du partenaire
      </p>

      <h3 className="mt-2 text-2xl font-black">
        Gestion des offres
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Ajoute, modifie et publie les offres qui
        apparaîtront dans les recommandations PiloEco.
      </p>

      {errorMessage && (
        <div className="mt-4 rounded-2xl bg-red-50 p-4 font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p className="mt-5 font-semibold text-slate-500">
          Chargement des offres...
        </p>
      ) : !partnerProfileId ? (
        <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-700">
          Le profil partenaire n’existe pas encore. Il
          sera créé lorsque le partenaire acceptera son
          invitation.
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {offers.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                Aucune offre enregistrée pour ce
                partenaire.
              </div>
            ) : (
              offers.map((offer) => {
                const isChanging =
                  changingOfferId === offer.id;

                return (
                  <article
                    key={offer.id}
                    className={`rounded-2xl border p-5 transition ${
                      editingOfferId === offer.id
                        ? "border-emerald-500 bg-emerald-50/40"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-black">
                            {offer.offer_name}
                          </h4>

                          {offer.is_featured && (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
                              ⭐ Mise en avant
                            </span>
                          )}

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              offer.is_active
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {offer.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          {offer.provider} ·{" "}
                          {offer.category}
                        </p>

                        <p className="mt-3 text-xl font-black text-emerald-600">
                          {Number(
                            offer.monthly_price
                          ).toFixed(2)}{" "}
                          €/mois
                        </p>

                        {offer.score !== null && (
                          <p className="mt-2 text-sm font-bold text-slate-600">
                            Score Pilo : {offer.score}/100
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditOffer(offer)
                        }
                        disabled={isChanging}
                        className="rounded-xl bg-blue-50 px-4 py-3 font-bold text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
                      >
                        ✏️ Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleToggleFeatured(
                            offer
                          )
                        }
                        disabled={isChanging}
                        className="rounded-xl bg-amber-50 px-4 py-3 font-bold text-amber-700 transition hover:bg-amber-100 disabled:opacity-60"
                      >
                        {offer.is_featured
                          ? "☆ Retirer la mise en avant"
                          : "⭐ Mettre en avant"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleToggleActive(
                            offer
                          )
                        }
                        disabled={isChanging}
                        className="rounded-xl border border-slate-300 px-4 py-3 font-bold transition hover:bg-slate-50 disabled:opacity-60"
                      >
                        {offer.is_active
                          ? "⏸ Désactiver"
                          : "▶ Activer"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleDeleteOffer(
                            offer
                          )
                        }
                        disabled={isChanging}
                        className="rounded-xl bg-red-50 px-4 py-3 font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                      >
                        🗑 Supprimer
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div
            id="partner-offer-form"
            className="mt-8 scroll-mt-6 rounded-3xl bg-slate-50 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-xl font-black">
                  {editingOfferId
                    ? "✏️ Modifier l’offre"
                    : "➕ Ajouter une offre"}
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  {editingOfferId
                    ? "Modifie les informations puis enregistre."
                    : "Cette offre sera rattachée au partenaire sélectionné."}
                </p>
              </div>

              {editingOfferId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold hover:bg-slate-100"
                >
                  Annuler
                </button>
              )}
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="offer-name"
                  className="text-sm font-bold"
                >
                  Nom de l’offre
                </label>

                <input
                  id="offer-name"
                  value={offerName}
                  onChange={(event) =>
                    setOfferName(event.target.value)
                  }
                  placeholder="Exemple : Forfait 250 Go"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="offer-provider"
                  className="text-sm font-bold"
                >
                  Fournisseur
                </label>

                <input
                  id="offer-provider"
                  value={provider}
                  onChange={(event) =>
                    setProvider(event.target.value)
                  }
                  placeholder="Exemple : Free Mobile"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="offer-category"
                  className="text-sm font-bold"
                >
                  Catégorie
                </label>

                <select
                  id="offer-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="offer-price"
                  className="text-sm font-bold"
                >
                  Prix mensuel
                </label>

                <input
                  id="offer-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={monthlyPrice}
                  onChange={(event) =>
                    setMonthlyPrice(
                      event.target.value
                    )
                  }
                  placeholder="19.99"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="offer-url"
                  className="text-sm font-bold"
                >
                  URL partenaire ou d’affiliation
                </label>

                <input
                  id="offer-url"
                  type="url"
                  value={url}
                  onChange={(event) =>
                    setUrl(event.target.value)
                  }
                  placeholder="https://..."
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="offer-network"
                  className="text-sm font-bold"
                >
                  Réseau
                </label>

                <input
                  id="offer-network"
                  value={network}
                  onChange={(event) =>
                    setNetwork(event.target.value)
                  }
                  placeholder="Exemple : 5G"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="offer-data"
                  className="text-sm font-bold"
                >
                  Data
                </label>

                <input
                  id="offer-data"
                  value={dataAmount}
                  onChange={(event) =>
                    setDataAmount(
                      event.target.value
                    )
                  }
                  placeholder="Exemple : 250 Go"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="offer-commitment"
                  className="text-sm font-bold"
                >
                  Engagement
                </label>

                <input
                  id="offer-commitment"
                  value={commitment}
                  onChange={(event) =>
                    setCommitment(
                      event.target.value
                    )
                  }
                  placeholder="Exemple : Sans engagement"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="offer-score"
                  className="text-sm font-bold"
                >
                  Score Pilo
                </label>

                <input
                  id="offer-score"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={score}
                  onChange={(event) =>
                    setScore(event.target.value)
                  }
                  placeholder="Exemple : 90"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3 font-bold">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) =>
                  setFeatured(
                    event.target.checked
                  )
                }
                className="h-5 w-5"
              />

              Mettre cette offre en avant
            </label>

            <button
              type="button"
              onClick={() =>
                void handleSaveOffer()
              }
              disabled={saving}
              className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-4 font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Enregistrement..."
                : editingOfferId
                  ? "💾 Enregistrer les modifications"
                  : "💾 Créer l’offre"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}