import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p>
          © {new Date().getFullYear()} PiloEco • FM SERVICES
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>

          <Link href="/confidentialite" className="hover:text-white">
            Confidentialité
          </Link>

          <Link href="/cgu" className="hover:text-white">
            CGU
          </Link>

          <Link href="/cgv" className="hover:text-white">
            CGV
          </Link>

          <Link href="/cookies" className="hover:text-white">
            Cookies
          </Link>

          <Link href="/support" className="hover:text-white">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}