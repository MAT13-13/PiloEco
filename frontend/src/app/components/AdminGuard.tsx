"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type Props = {
  children: ReactNode;
};

export default function AdminGuard({
  children,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!mounted) {
          return;
        }

        if (userError || !user) {
          router.replace("/login");
          return;
        }

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("profils")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (!mounted) {
          return;
        }

        if (
          profileError ||
          profile?.role !== "admin"
        ) {
          router.replace("/dashboard");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error(
          "Erreur de vérification admin :",
          error
        );

        router.replace("/dashboard");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void checkAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-green-400" />

          <p className="mt-5 font-semibold text-slate-400">
            Vérification des droits...
          </p>
        </div>
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}