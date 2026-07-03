type Analyse = {
  id: string;
  telephone: number;
  internet: number;
  assurance: number;
  electricite: number;
  total_depenses: number;
  economie_possible: number;
  economie_annuelle: number;
  created_at: string;
};

type HistoryListProps = {
  analyses: Analyse[];
};

export default function HistoryList({ analyses }: HistoryListProps) {
  return (
    <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Historique</h2>

      {analyses.length === 0 ? (
        <p className="text-slate-400">Aucune analyse enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {analyses.map((analyse) => (
            <div
              key={analyse.id}
              className="rounded-xl bg-slate-950 border border-slate-800 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold">{analyse.total_depenses} € analysés</p>
                  <p className="text-sm text-slate-400">
                    {new Date(analyse.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-400 font-bold">
                    {analyse.economie_possible} € / mois
                  </p>
                  <p className="text-sm text-slate-400">
                    {analyse.economie_annuelle} € / an
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}