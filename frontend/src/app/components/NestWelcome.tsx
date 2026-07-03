type Props = {
  prenom: string;
};

export default function NestWelcome({ prenom }: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-green-500 bg-slate-900 p-8">
      <p className="text-green-400 font-bold text-lg">
        🪺 Mon Nid
      </p>

      <h1 className="mt-4 text-4xl font-bold text-white">
        Bonjour {prenom} 👋
      </h1>

      <p className="mt-4 text-slate-300 text-lg">
        Je suis heureux de te retrouver.
      </p>

      <p className="mt-2 text-slate-400">
        Je veille sur ton portefeuille et je continue de chercher les meilleures opportunités pour toi.
      </p>
    </div>
  );
}