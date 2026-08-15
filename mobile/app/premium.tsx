import {
  ActivityIndicator,
  AppState,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";

import { openPremiumCheckout } from "../lib/premiumCheckout";
import { supabase } from "../lib/supabase";

export default function PremiumScreen() {
  const [checkoutLoading, setCheckoutLoading] =
    useState(false);

  const [premiumLoading, setPremiumLoading] =
    useState(true);

  const [isPremium, setIsPremium] =
    useState(false);

  async function loadPremiumStatus() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setIsPremium(false);
        return;
      }

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profils")
        .select("premium")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Erreur récupération Premium :",
          profileError
        );

        return;
      }

      setIsPremium(
        profile?.premium === true
      );
    } catch (error) {
      console.error(
        "Erreur statut Premium :",
        error
      );
    } finally {
      setPremiumLoading(false);
    }
  }

  /*
   * Vérification lorsque l'écran
   * Premium est affiché.
   */
  useFocusEffect(
    useCallback(() => {
      void loadPremiumStatus();
    }, [])
  );

  /*
   * Vérification lorsque l'utilisateur
   * revient dans l'application après Stripe.
   */
  useEffect(() => {
    const subscription =
      AppState.addEventListener(
        "change",
        (state) => {
          if (state === "active") {
            void loadPremiumStatus();
          }
        }
      );

    return () => {
      subscription.remove();
    };
  }, []);

  async function handlePremium() {
    if (
      checkoutLoading ||
      premiumLoading ||
      isPremium
    ) {
      return;
    }

    try {
      setCheckoutLoading(true);

      await openPremiumCheckout();
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.icon}>
        💎
      </Text>

      <Text style={styles.kicker}>
        PILO PREMIUM
      </Text>

      <Text style={styles.title}>
        {isPremium
          ? "Premium est actif"
          : "Pilo veille pour toi"}
      </Text>

      <Text style={styles.text}>
        {isPremium
          ? "Ton compte profite de toutes les fonctionnalités Premium de PiloEco."
          : "Monitoring, alertes, échéances et PiloLife réunis pour t'accompagner toute l'année."}
      </Text>

      <View
        style={[
          styles.priceCard,
          isPremium &&
            styles.activeCard,
        ]}
      >
        {premiumLoading ? (
          <>
            <ActivityIndicator
              color="#c084fc"
              size="small"
            />

            <Text
              style={
                styles.loadingStatusText
              }
            >
              Vérification de ton abonnement...
            </Text>
          </>
        ) : isPremium ? (
          <>
            <Text
              style={
                styles.activeIcon
              }
            >
              ✓
            </Text>

            <Text
              style={
                styles.activeTitle
              }
            >
              Premium actif
            </Text>

            <Text
              style={
                styles.activeText
              }
            >
              Tous les services Premium sont
              débloqués.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.price}>
              4,99 €
            </Text>

            <Text
              style={styles.priceText}
            >
              par mois · sans engagement
            </Text>
          </>
        )}
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Text
            style={styles.featureIcon}
          >
            📊
          </Text>

          <View
            style={
              styles.featureContent
            }
          >
            <Text
              style={
                styles.featureTitle
              }
            >
              Monitoring
            </Text>

            <Text
              style={styles.featureText}
            >
              Suis tes contrats, leurs prix et
              leurs échéances.
            </Text>
          </View>

          {isPremium && (
            <Text
              style={
                styles.featureActive
              }
            >
              ✓
            </Text>
          )}
        </View>

        <View style={styles.feature}>
          <Text
            style={styles.featureIcon}
          >
            🔔
          </Text>

          <View
            style={
              styles.featureContent
            }
          >
            <Text
              style={
                styles.featureTitle
              }
            >
              Alertes Pilo
            </Text>

            <Text
              style={styles.featureText}
            >
              Pilo te prévient lorsque quelque
              chose mérite ton attention.
            </Text>
          </View>

          {isPremium && (
            <Text
              style={
                styles.featureActive
              }
            >
              ✓
            </Text>
          )}
        </View>

        <View style={styles.feature}>
          <Text
            style={styles.featureIcon}
          >
            🌿
          </Text>

          <View
            style={
              styles.featureContent
            }
          >
            <Text
              style={
                styles.featureTitle
              }
            >
              PiloLife
            </Text>

            <Text
              style={styles.featureText}
            >
              Transforme tes économies en
              projets de vie.
            </Text>
          </View>

          {isPremium && (
            <Text
              style={
                styles.featureActive
              }
            >
              ✓
            </Text>
          )}
        </View>
      </View>

      {!isPremium && (
        <>
          <TouchableOpacity
            style={[
              styles.premiumButton,
              (checkoutLoading ||
                premiumLoading) &&
                styles.premiumButtonDisabled,
            ]}
            onPress={() =>
              void handlePremium()
            }
            disabled={
              checkoutLoading ||
              premiumLoading
            }
            activeOpacity={0.85}
          >
            {checkoutLoading ? (
              <View
                style={
                  styles.loadingRow
                }
              >
                <ActivityIndicator
                  color="#020617"
                  size="small"
                />

                <Text
                  style={
                    styles.premiumButtonText
                  }
                >
                  Ouverture de Stripe...
                </Text>
              </View>
            ) : (
              <Text
                style={
                  styles.premiumButtonText
                }
              >
                💎 Passer Premium — 4,99 €/mois
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={styles.secureText}
          >
            🔒 Paiement sécurisé par Stripe
          </Text>
        </>
      )}

      {isPremium && (
        <View
          style={
            styles.premiumActiveBanner
          }
        >
          <Text
            style={
              styles.premiumActiveBannerText
            }
          >
            💎 Ton abonnement Premium est actif
          </Text>
        </View>
      )}

      <View
        style={styles.bottomSpace}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
  },

  content: {
    padding: 24,
    paddingTop: 55,
  },

  icon: {
    textAlign: "center",
    fontSize: 62,
  },

  kicker: {
    marginTop: 18,
    textAlign: "center",
    color: "#c084fc",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },

  title: {
    marginTop: 10,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
  },

  text: {
    marginTop: 14,
    textAlign: "center",
    color: "#94a3b8",
    lineHeight: 22,
  },

  priceCard: {
    marginTop: 28,
    padding: 22,
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#7e22ce",
    backgroundColor: "#17112b",
  },

  activeCard: {
    borderColor: "#22c55e",
    backgroundColor: "#052e16",
  },

  price: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
  },

  priceText: {
    marginTop: 4,
    color: "#c4b5fd",
    fontWeight: "700",
  },

  loadingStatusText: {
    marginTop: 10,
    color: "#c4b5fd",
    fontSize: 12,
    fontWeight: "700",
  },

  activeIcon: {
    color: "#22c55e",
    fontSize: 34,
    fontWeight: "900",
  },

  activeTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
  },

  activeText: {
    marginTop: 6,
    color: "#86efac",
    fontSize: 12,
    textAlign: "center",
  },

  features: {
    marginTop: 25,
    gap: 11,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  featureIcon: {
    fontSize: 27,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  featureText: {
    marginTop: 4,
    color: "#94a3b8",
    fontSize: 10,
    lineHeight: 16,
  },

  featureActive: {
    color: "#22c55e",
    fontSize: 20,
    fontWeight: "900",
  },

  premiumButton: {
    marginTop: 26,
    minHeight: 58,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: "#a855f7",
    alignItems: "center",
    justifyContent: "center",
  },

  premiumButtonDisabled: {
    opacity: 0.6,
  },

  premiumButtonText: {
    color: "#020617",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  secureText: {
    marginTop: 11,
    textAlign: "center",
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
  },

  premiumActiveBanner: {
    marginTop: 24,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#166534",
    backgroundColor: "#052e16",
  },

  premiumActiveBannerText: {
    color: "#86efac",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "900",
  },

  bottomSpace: {
    height: 40,
  },
});