import {
    Alert,
    Linking,
} from "react-native";

import { supabase } from "./supabase";

export async function openPremiumCheckout() {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "Erreur session Supabase :",
        sessionError
      );

      throw new Error(
        "Impossible de récupérer ta session."
      );
    }

    if (!session?.access_token) {
      Alert.alert(
        "Connexion requise",
        "Reconnecte-toi à PiloEco avant de passer Premium."
      );

      return false;
    }

    const accessToken =
      session.access_token;

    console.log(
      "Session Premium trouvée :",
      Boolean(accessToken)
    );

    const response = await fetch(
      "https://piloeco.com/api/stripe/checkout",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "x-pilo-access-token":
            accessToken,

          "Content-Type":
            "application/json",
        },
      }
    );

    const rawResponse =
      await response.text();

    console.log(
      "Stripe HTTP :",
      response.status
    );

    console.log(
      "Stripe réponse :",
      rawResponse
    );

    let data: {
      success?: boolean;
      url?: string;
      error?: string;
    } = {};

    try {
      data = rawResponse
        ? JSON.parse(rawResponse)
        : {};
    } catch {
      throw new Error(
        "Réponse invalide du serveur PiloEco."
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error ||
          `Erreur Stripe ${response.status}`
      );
    }

    if (!data.url) {
      throw new Error(
        "Aucune URL de paiement Stripe reçue."
      );
    }

    const supported =
      await Linking.canOpenURL(
        data.url
      );

    if (!supported) {
      throw new Error(
        "Impossible d'ouvrir la page Stripe."
      );
    }

    await Linking.openURL(
      data.url
    );

    return true;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erreur inconnue.";

    console.error(
      "Erreur Premium Stripe :",
      error
    );

    Alert.alert(
      "Paiement Premium",
      message
    );

    return false;
  }
}