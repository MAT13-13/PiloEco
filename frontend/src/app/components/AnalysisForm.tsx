type ResultatEconomies = {
  economiePossible: number;
  economieAnnuelle: number;
  totalDepenses: number;
};

type AnalysisFormProps = {
  telephone: string;
  internet: string;
  assurance: string;
  electricite: string;
  setTelephone: (value: string) => void;
  setInternet: (value: string) => void;
  setAssurance: (value: string) => void;
  setElectricite: (value: string) => void;
  calculerEconomies: () => void;
  resultat: ResultatEconomies | null;
  message: string;
};

export default function AnalysisForm({
  telephone,
  internet,
  assurance,
  electricite,
  setTelephone,
  setInternet,
  setAssurance,
  setElectricite,
  calculerEconomies,
  resultat,
  message,
}: AnalysisFormProps) {
  return (
    <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-2">Nouvelle analyse</h2>

      <p className="text-slate-300 mb-6">
        Entre tes dépenses mensuelles et découvre tes économies possibles.
      </p>

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Forfait téléphone (€ / mois)"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="w-full rounded-xl p-4 bg-white text-black placeholder:text-slate-500"
        />

        <input
          type="number"
          placeholder="Internet (€ / mois)"
          value={internet}
          onChange={(e) => setInternet(e.target.value)}
          className="w-full rounded-xl p-4 bg-white text-black placeholder:text-slate-500"
        />

        <input
          type="number"
          placeholder="Assurance (€ / mois)"
          value={assurance}
          onChange={(e) => setAssurance(e.target.value)}
          className="w-full rounded-xl p-4 bg-white text-black placeholder:text-slate-500"
        />

        <input
          type="number"
          placeholder="Électricité (€ / mois)"
          value={electricite}
          onChange={(e) => setElectricite(e.target.value)}
          className="w-full rounded-xl p-4 bg-white text-black placeholder:text-slate-500"
        />

        <button
          onClick={calculerEconomies}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition"
        >
          Calculer et enregistrer
        </button>
      </div>

      {resultat !== null && (
        <div className="mt-8 rounded-xl border border-green-500 bg-slate-950 p-6 text-center">
          <p className="text-slate-300">Total dépenses analysées</p>

          <p className="mt-2 text-3xl font-bold text-white">
            {resultat.totalDepenses} € / mois
          </p>

          <p className="mt-6 text-slate-300">Économie estimée</p>

          <p className="mt-2 text-5xl font-bold text-green-400">
            {resultat.economiePossible} € / mois
          </p>

          <p className="mt-4 text-green-300">
            Soit environ {resultat.economieAnnuelle} € par an
          </p>
        </div>
      )}

      {message && (
        <p className="mt-6 text-center text-sm text-slate-300">{message}</p>
      )}
    </section>
  );
}