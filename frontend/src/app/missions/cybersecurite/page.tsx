export default function CyberSecuritePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-400">
          PiloEco
        </p>

        <h1 className="mt-3 text-4xl font-black">
          🛡️ Cybersécurité
        </h1>

        <p className="mt-4 text-slate-300">
          Protégez votre vie numérique grâce à des solutions reconnues pour
          sécuriser votre connexion et préserver votre confidentialité.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* NordVPN */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">
              🌍 Protéger ma connexion Internet
            </h2>

            <p className="mt-4 text-slate-300">
              Chiffrez votre connexion, sécurisez vos données sur les réseaux
              Wi-Fi publics et protégez votre vie privée avec NordVPN.
            </p>

            <a
              href="https://nordvpn.com/fr/coupon/deal/?coupon=extra1yoff&utm_campaign=off314&utm_content&utm_medium=affiliate&utm_source=aff2495&utm_term="
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
            >
              Découvrir NordVPN
            </a>
          </div>

          {/* Abelssoft */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">
              🕵️ Protéger ma vie privée
            </h2>

            <p className="mt-4 text-slate-300">
              Réduisez le suivi en ligne, protégez vos données personnelles et
              reprenez le contrôle de votre confidentialité grâce à
              AntiBrowserSpy.
            </p>

            <a
              href="https://www.kqzyfj.com/click-101847438-15402312"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
            >
              Protéger ma vie privée
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}