import Link from "next/link";

const mainItems = [
  { label: "🏡 Mon Nid", href: "/dashboard" },
  { label: "💰 Mes économies", href: "/economies" },
  { label: "🎯 Mes missions", href: "/missions" },
  { label: "📈 Mon évolution", href: "/evolution" },
  { label: "🌿 PiloLife ⭐", href: "/pilolife" },
];
const universeItems = [
  { label: "👨‍👩‍👧 Famille & aides", href: "/missions/famille" },
  { label: "❤️ Mutuelle santé", href: "/missions/mutuelle-sante" },
  { label: "👴 Mutuelle senior", href: "/missions/mutuelle-senior" },

  { label: "🐶 Assurance animaux", href: "/missions/assurance-animaux" },
  { label: "🕊️ Assurance obsèques", href: "/missions/assurance-obseques" },
  { label: "📱 Téléphone", href: "/missions/mobile" },

  { label: "👴 Téléphone senior", href: "/missions/telephone-senior" },
  { label: "🌐 Internet", href: "/missions/internet" },
  { label: "⚡ Électricité", href: "/missions/electricite" },

  { label: "📺 Streaming", href: "/missions/streaming" },
  { label: "🏦 Banque", href: "/missions/banque" },
  { label: "🏠 Crédit immobilier", href: "/missions/credit-immobilier" },

  { label: "🛠️ Travaux & rénovation", href: "/missions/travaux-renovation" },
  { label: "💳 Fintech & budget", href: "/missions/fintech-budget" },
  { label: "₿ Cryptomonnaies", href: "/missions/cryptomonnaies" },

  { label: "🏠 Assurance habitation", href: "/missions/habitation" },
  { label: "🚗 Assurance auto", href: "/missions/assurance-auto" },
  { label: "🏍️ Assurance moto", href: "/missions/assurance-moto" },

  { label: "🚲 Mobilités douces", href: "/missions/mobilites-douces" },
  { label: "🔧 Services auto", href: "/missions/services-auto" },
  { label: "🏍️ Moto & équipement", href: "/missions/moto-equipement" },

  { label: "✈️ Voyage", href: "/missions/voyage" },
  { label: "🎓 Formation", href: "/missions/formation" },
  { label: "🔐 Alarme & sécurité", href: "/missions/alarme-securite" },

  { label: "🛡️ Cybersécurité", href: "/missions/cybersecurite" },
  { label: "🌐 Site internet pro", href: "/missions/site-internet-pro" },

  // Nouvelle rubrique B2B
  { label: "🏢 Services aux entreprises", href: "/missions/services-entreprises" },

  { label: "💻 Logiciels", href: "/missions/logiciels" },

  { label: "🚚 Déménagement", href: "/missions/demenagement" },
  { label: "📦 Débarras", href: "/missions/debarras" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 overflow-y-auto border-r border-slate-800 bg-slate-950 p-6 text-white lg:block">
      <div>
        <h1 className="text-3xl font-black text-green-400">
          PiloEco
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Ton copilote d&apos;économies
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {mainItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block w-full rounded-xl px-4 py-3 text-left font-bold transition ${
              index === 0
                ? "bg-green-500 text-slate-950"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <div className="my-6 border-t border-slate-800" />

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
          Univers Pilo
        </p>

        <div className="space-y-1">
          {universeItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="my-6 border-t border-slate-800" />

        <Link
          href="/premium"
          className="block w-full rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-left font-bold text-purple-300 transition hover:bg-purple-500/20"
        >
          💎 Pilo Premium
        </Link>

        <Link
          href="/parametres"
          className="mt-3 block w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-left font-bold text-white transition hover:border-green-500/40 hover:bg-slate-800"
        >
          ⚙️ Mon compte
        </Link>

        <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
          <p className="font-bold text-white">
            🐦 Parle à Pilo
          </p>

          <p className="mt-2 text-sm text-slate-300">
            Une question ? Je suis là pour t&apos;aider 💚
          </p>

          <Link
            href="/assistant"
            className="mt-4 block w-full rounded-xl bg-green-500 py-3 text-center font-black text-slate-950 transition hover:bg-green-400"
          >
            Discuter →
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Version actuelle
          </p>

          <p className="font-bold text-green-400">
            Gratuite
          </p>
        </div>
      </nav>
    </aside>
  );
}