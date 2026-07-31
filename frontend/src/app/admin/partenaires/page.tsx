"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import PartnerOffersManager from "./components/PartnerOffersManager";
import AdminGuard from "../../components/AdminGuard";

import {
  getPartnerRequests,
  updatePartnerRequest,
  updatePartnerRequestNotes,
  updatePartnerRequestStatus,
  type PartnerRequest,
  type PartnerRequestStatus,
} from "./services/partner.service";

const statuses: PartnerRequestStatus[] = [
  "En attente",
  "À relancer",
  "Relancé",
  "Accepté",
  "Refusé",
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getStatusClasses(status: PartnerRequestStatus) {
  switch (status) {
    case "Accepté":
      return "bg-emerald-100 text-emerald-700";
    case "Refusé":
      return "bg-red-100 text-red-700";
    case "Relancé":
      return "bg-blue-100 text-blue-700";
    case "À relancer":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function PartenairesPage() {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<PartnerRequest | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  const [notes, setNotes] = useState("");
  const [contactDate, setContactDate] = useState("");
const [followUpDate, setFollowUpDate] = useState("");
const [signedDate, setSignedDate] = useState("");

const [commissionPercent, setCommissionPercent] = useState("");
const [commissionFixed, setCommissionFixed] = useState("");

const [estimatedRevenue, setEstimatedRevenue] = useState("");

const [totalSales, setTotalSales] = useState("");
const [totalRevenue, setTotalRevenue] = useState("");

const [contractUrl, setContractUrl] = useState("");

const [savingPartner, setSavingPartner] = useState(false);
const [sendingInvitation, setSendingInvitation] =
  useState(false);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

  const loadRequests = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getPartnerRequests();

      setRequests(data);

      if (data.length > 0) {
  const firstRequest = data[0];

  setSelectedRequest(firstRequest);
  setNotes(firstRequest.internal_notes ?? "");

  setContactDate(firstRequest.contact_date ?? "");
  setFollowUpDate(firstRequest.follow_up_date ?? "");
  setSignedDate(firstRequest.signed_date ?? "");

  setCommissionPercent(
    firstRequest.commission_percent?.toString() ?? ""
  );

  setCommissionFixed(
    firstRequest.commission_fixed?.toString() ?? ""
  );

  setEstimatedRevenue(
    firstRequest.estimated_monthly_revenue?.toString() ?? ""
  );

  setTotalSales(firstRequest.total_sales?.toString() ?? "0");
  setTotalRevenue(firstRequest.total_revenue?.toString() ?? "0");
  setContractUrl(firstRequest.contract_url ?? "");
}
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Impossible de charger les demandes."
      );
    } finally {
      setLoading(false);
    }
  };

  void loadRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !normalizedSearch ||
        request.company.toLowerCase().includes(normalizedSearch) ||
        request.name.toLowerCase().includes(normalizedSearch) ||
        request.email.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "Tous" || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter(
        (request) => request.status === "En attente"
      ).length,
      followUp: requests.filter(
        (request) => request.status === "À relancer"
      ).length,
      accepted: requests.filter(
        (request) => request.status === "Accepté"
      ).length,
    };
  }, [requests]);

  const handleSelectRequest = (request: PartnerRequest) => {
    setSelectedRequest(request);
    setNotes(request.internal_notes ?? "");
    setContactDate(request.contact_date ?? "");
setFollowUpDate(request.follow_up_date ?? "");
setSignedDate(request.signed_date ?? "");

setCommissionPercent(
  request.commission_percent?.toString() ?? ""
);

setCommissionFixed(
  request.commission_fixed?.toString() ?? ""
);

setEstimatedRevenue(
  request.estimated_monthly_revenue?.toString() ?? ""
);

setTotalSales(request.total_sales.toString());

setTotalRevenue(
  request.total_revenue.toString()
);

setContractUrl(request.contract_url ?? "");
  };

  const handleStatusChange = async (
    status: PartnerRequestStatus
  ) => {
    if (!selectedRequest) {
      return;
    }

    try {
      setSavingStatus(true);
      setErrorMessage("");

      const updatedRequest = await updatePartnerRequestStatus(
        selectedRequest.id,
        status
      );

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === updatedRequest.id
            ? updatedRequest
            : request
        )
      );

      setSelectedRequest(updatedRequest);
    } catch (error) {
      console.error("Erreur changement statut :", error);
      setErrorMessage("Impossible de modifier le statut.");
    } finally {
      setSavingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedRequest) {
      return;
    }
    
    try {
      setSavingNotes(true);
      setErrorMessage("");

      const updatedRequest = await updatePartnerRequestNotes(
        selectedRequest.id,
        notes
      );

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === updatedRequest.id
            ? updatedRequest
            : request
        )
      );

      setSelectedRequest(updatedRequest);
      setNotes(updatedRequest.internal_notes ?? "");
    } catch (error) {
      console.error("Erreur notes internes :", error);
      setErrorMessage("Impossible d’enregistrer les notes.");
    } finally {
      setSavingNotes(false);
    }
  };
  const handleSavePartner = async () => {
  if (!selectedRequest) {
    return;
  }

  try {
    setSavingPartner(true);
    setErrorMessage("");

    const updatedRequest = await updatePartnerRequest(
      selectedRequest.id,
      {
        contact_date: contactDate || null,
        follow_up_date: followUpDate || null,
        signed_date: signedDate || null,

        commission_percent:
          commissionPercent === ""
            ? null
            : Number(commissionPercent),

        commission_fixed:
          commissionFixed === ""
            ? null
            : Number(commissionFixed),

        estimated_monthly_revenue:
          estimatedRevenue === ""
            ? null
            : Number(estimatedRevenue),

        total_sales: Number(totalSales) || 0,

        total_revenue:
          Number(totalRevenue) || 0,

        contract_url:
          contractUrl.trim() || null,
      }
    );

    setRequests((current) =>
      current.map((request) =>
        request.id === updatedRequest.id
          ? updatedRequest
          : request
      )
    );

    setSelectedRequest(updatedRequest);
  } catch (error) {
    console.error(error);

    setErrorMessage(
      "Impossible d'enregistrer la fiche partenaire."
    );
  } finally {
    setSavingPartner(false);
  }
};

async function handleInvitePartner() {
  if (!selectedRequest) {
    return;
  }

  try {
    setSendingInvitation(true);
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error(
        "Vous devez être connecté."
      );
    }

    const response = await fetch(
      "/api/partners/invite",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          requestId: selectedRequest.id,
        }),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ??
          "Impossible d'envoyer l'invitation."
      );
    }

    alert(result.message);

    window.location.reload();
  } catch (error) {
    console.error(error);

    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Impossible d'envoyer l'invitation."
    );
  } finally {
    setSendingInvitation(false);
  }
}

  return (
    <AdminGuard>
      <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-700"
            >
              ← Retour au dashboard
            </Link>

            <p className="mt-5 font-bold uppercase tracking-[0.2em] text-emerald-600">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Gestion des partenaires
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Consulte les demandes reçues, mets à jour leur statut et
              ajoute tes notes internes.
            </p>
          </div>

          <Link
            href="/devenir-partenaire"
            className="inline-flex justify-center rounded-2xl bg-emerald-600 px-6 py-3 font-black text-white transition hover:bg-emerald-700"
          >
            Voir la page partenaire
          </Link>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

  <article className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-xl">
    <p className="text-sm font-bold uppercase tracking-wider">
      💰 Revenu estimé / mois
    </p>

    <p className="mt-4 text-4xl font-black">
      {requests
        .reduce(
          (total, request) =>
            total +
            (request.estimated_monthly_revenue ?? 0),
          0
        )
        .toLocaleString("fr-FR")} €
    </p>

    <p className="mt-2 text-sm opacity-80">
      Estimation actuelle
    </p>
  </article>

  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-sm font-bold text-slate-500">
      🤝 Partenaires signés
    </p>

    <p className="mt-3 text-4xl font-black text-emerald-600">
      {
        requests.filter(
          (r) => r.status === "Accepté"
        ).length
      }
    </p>

    <p className="mt-2 text-sm text-slate-500">
      Contrats actifs
    </p>
  </article>

  <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
    <p className="text-sm font-bold text-amber-700">
      🔄 À relancer
    </p>

    <p className="mt-3 text-4xl font-black text-amber-700">
      {
        requests.filter(
          (r) => r.status === "À relancer"
        ).length
      }
    </p>

    <p className="mt-2 text-sm text-amber-700">
      Priorité commerciale
    </p>
  </article>

  <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
    <p className="text-sm font-bold text-blue-700">
      📈 Chiffre d'affaires
    </p>

    <p className="mt-3 text-4xl font-black text-blue-700">
      {requests
        .reduce(
          (total, request) =>
            total +
            (request.total_revenue ?? 0),
          0
        )
        .toLocaleString("fr-FR")} €
    </p>

    <p className="mt-2 text-sm text-blue-700">
      Depuis le lancement
    </p>
  </article>

</section>

        {errorMessage && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher une entreprise, un nom ou un e-mail"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="Tous">Tous les statuts</option>

                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center font-semibold text-slate-500">
                Chargement des demandes...
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-5xl">🤝</div>

                <h2 className="mt-4 text-2xl font-black">
                  Aucune demande trouvée
                </h2>

                <p className="mt-2 text-slate-500">
                  Modifie ta recherche ou ton filtre.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredRequests.map((request) => {
                  const isSelected =
                    selectedRequest?.id === request.id;

                  return (
                    <button
                      key={request.id}
                      type="button"
                      onClick={() => handleSelectRequest(request)}
                      className={`w-full p-5 text-left transition ${
                        isSelected
                          ? "bg-emerald-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-black">
                              {request.company}
                            </h2>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-black ${getStatusClasses(
                                request.status
                              )}`}
                            >
                              {request.status}
                            </span>
                          </div>

                          <p className="mt-2 font-semibold text-slate-700">
                            {request.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {request.email}
                          </p>

                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                            {request.message}
                          </p>
                        </div>

                        <div className="shrink-0 text-sm font-semibold text-slate-400">
                          {formatDate(request.created_at)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-6 xl:self-start">
            {!selectedRequest ? (
              <div className="py-12 text-center">
                <div className="text-5xl">📩</div>

                <h2 className="mt-4 text-2xl font-black">
                  Sélectionne une demande
                </h2>

                <p className="mt-2 text-slate-500">
                  Les informations complètes apparaîtront ici.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                      Demande partenaire
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      {selectedRequest.company}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      Reçue le{" "}
                      {formatDate(selectedRequest.created_at)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-black ${getStatusClasses(
                      selectedRequest.status
                    )}`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>

                <div className="mt-8 space-y-5">
                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      Contact
                    </p>
                    <p className="mt-1 font-black">
                      {selectedRequest.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      Adresse e-mail
                    </p>

                    <a
                      href={`mailto:${selectedRequest.email}`}
                      className="mt-1 inline-block break-all font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      {selectedRequest.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      Site internet
                    </p>

                    {selectedRequest.website ? (
                      <a
                        href={selectedRequest.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block break-all font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        {selectedRequest.website}
                      </a>
                    ) : (
                      <p className="mt-1 text-slate-500">
                        Non renseigné
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      Type de partenariat
                    </p>
                    <p className="mt-1 font-black">
                      {selectedRequest.partnership_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-500">
                      Message
                    </p>

                    <div className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 leading-7 text-slate-700">
                      {selectedRequest.message}
                    </div>
                  </div>
                </div>

               <div className="mt-8 border-t border-slate-200 pt-6">
  <label
    htmlFor="partner-status"
    className="block text-sm font-bold text-slate-700"
  >
    Statut
  </label>

  <select
    id="partner-status"
    value={selectedRequest.status}
    disabled={savingStatus}
    onChange={(event) =>
      void handleStatusChange(
        event.target.value as PartnerRequestStatus
      )
    }
    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
  >
    {statuses.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>

<div className="mt-8 border-t border-slate-200 pt-6">
  <div>
    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
      Suivi commercial
    </p>

    <h3 className="mt-2 text-2xl font-black">
      Fiche partenaire
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      Enregistre les dates, les commissions et les revenus
      générés par ce partenaire.
    </p>
  </div>

  <div className="mt-6 grid gap-5 sm:grid-cols-2">
    <div>
      <label
        htmlFor="contact-date"
        className="block text-sm font-bold text-slate-700"
      >
        Date du premier contact
      </label>

      <input
        id="contact-date"
        type="date"
        value={contactDate}
        onChange={(event) =>
          setContactDate(event.target.value)
        }
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>

    <div>
      <label
        htmlFor="follow-up-date"
        className="block text-sm font-bold text-slate-700"
      >
        Date de relance
      </label>

      <input
        id="follow-up-date"
        type="date"
        value={followUpDate}
        onChange={(event) =>
          setFollowUpDate(event.target.value)
        }
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>

    <div>
      <label
        htmlFor="signed-date"
        className="block text-sm font-bold text-slate-700"
      >
        Date de signature
      </label>

      <input
        id="signed-date"
        type="date"
        value={signedDate}
        onChange={(event) =>
          setSignedDate(event.target.value)
        }
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>

    <div>
      <label
        htmlFor="commission-percent"
        className="block text-sm font-bold text-slate-700"
      >
        Commission en pourcentage
      </label>

      <div className="relative mt-2">
        <input
          id="commission-percent"
          type="number"
          min="0"
          step="0.01"
          value={commissionPercent}
          onChange={(event) =>
            setCommissionPercent(event.target.value)
          }
          placeholder="Exemple : 10"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-black text-slate-400">
          %
        </span>
      </div>
    </div>

    <div>
      <label
        htmlFor="commission-fixed"
        className="block text-sm font-bold text-slate-700"
      >
        Commission fixe
      </label>

      <div className="relative mt-2">
        <input
          id="commission-fixed"
          type="number"
          min="0"
          step="0.01"
          value={commissionFixed}
          onChange={(event) =>
            setCommissionFixed(event.target.value)
          }
          placeholder="Exemple : 30"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-black text-slate-400">
          €
        </span>
      </div>
    </div>

    <div>
      <label
        htmlFor="estimated-revenue"
        className="block text-sm font-bold text-slate-700"
      >
        Revenu mensuel estimé
      </label>

      <div className="relative mt-2">
        <input
          id="estimated-revenue"
          type="number"
          min="0"
          step="0.01"
          value={estimatedRevenue}
          onChange={(event) =>
            setEstimatedRevenue(event.target.value)
          }
          placeholder="Exemple : 500"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-black text-slate-400">
          €
        </span>
      </div>
    </div>

    <div>
      <label
        htmlFor="total-sales"
        className="block text-sm font-bold text-slate-700"
      >
        Nombre total de ventes
      </label>

      <input
        id="total-sales"
        type="number"
        min="0"
        step="1"
        value={totalSales}
        onChange={(event) =>
          setTotalSales(event.target.value)
        }
        placeholder="0"
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </div>

    <div>
      <label
        htmlFor="total-revenue"
        className="block text-sm font-bold text-slate-700"
      >
        Revenu total généré
      </label>

      <div className="relative mt-2">
        <input
          id="total-revenue"
          type="number"
          min="0"
          step="0.01"
          value={totalRevenue}
          onChange={(event) =>
            setTotalRevenue(event.target.value)
          }
          placeholder="0"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-black text-slate-400">
          €
        </span>
      </div>
    </div>
  </div>

  <div className="mt-5">
    <label
      htmlFor="contract-url"
      className="block text-sm font-bold text-slate-700"
    >
      Lien du contrat
    </label>

    <input
      id="contract-url"
      type="url"
      value={contractUrl}
      onChange={(event) =>
        setContractUrl(event.target.value)
      }
      placeholder="https://..."
      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    />

    {contractUrl.trim() && (
      <a
        href={contractUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm font-bold text-emerald-600 hover:text-emerald-700"
      >
        Ouvrir le contrat ↗
      </a>
    )}
  </div>

  <button
    type="button"
    onClick={() => void handleSavePartner()}
    disabled={savingPartner}
    className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-4 font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {savingPartner
      ? "Enregistrement de la fiche..."
      : "💾 Enregistrer la fiche partenaire"}
      </button>
<button
  type="button"
  onClick={() => void handleInvitePartner()}
  disabled={sendingInvitation}
  className="mt-4 w-full rounded-2xl bg-blue-600 px-5 py-4 font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
>
  {sendingInvitation
    ? "Envoi de l'invitation..."
    : "📨 Envoyer l'invitation"}
</button>
</div>
<PartnerOffersManager
  partnerRequestId={selectedRequest.id}
/>

<div className="mt-8 border-t border-slate-200 pt-6">
  <label
    htmlFor="partner-notes"
    className="block text-sm font-bold text-slate-700"
  >
    Notes internes
  </label>

  <textarea
    id="partner-notes"
    value={notes}
    onChange={(event) => setNotes(event.target.value)}
    rows={6}
    placeholder="Ajoute ici les informations importantes, les dates de relance ou les conditions proposées."
    className="mt-2 w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
  />

    <button
    type="button"
    onClick={() => void handleSaveNotes()}
    disabled={savingNotes}
    className="mt-3 w-full rounded-2xl bg-slate-950 px-5 py-3 font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {savingNotes
      ? "Enregistrement..."
      : "Enregistrer les notes"}
  </button>
</div>

              </>
            )}
          </aside>
        </section>
      </div>
      </main>
    </AdminGuard>
  );
}