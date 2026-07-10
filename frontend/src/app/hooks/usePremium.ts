"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function usePremium() {
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPremium() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("USER EMAIL:", user?.email);

      if (!user?.email) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profils")
        .select("*")
        .eq("email", user.email)
        .single();

      console.log("PROFILE DATA:", data);
      console.log("PROFILE ERROR:", error);

      setPremium(data?.premium === true);
      setLoading(false);
    }

    loadPremium();
  }, []);

  return {
    premium,
    loading,
  };
}