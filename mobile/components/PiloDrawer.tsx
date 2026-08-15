import { router } from "expo-router";
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  premium: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const availableItems = [
  {
    label: "👨‍👩‍👧 Famille & aides",
    href: "/missions/famille",
  },
  {
    label: "🌸 Beauté & Artisanat",
    href: "/missions/beaute-artisanat",
  },
  {
    label: "✈️ Voyage",
    href: "/missions/voyage",
  },
  {
    label: "📱 Téléphone",
    href: "/missions/mobile",
  },
  {
    label: "👵 Téléphone senior",
    href: "/missions/telephone-senior",
  },
  {
    label: "🌐 Site internet pro",
    href: "/missions/site-internet-pro",
  },
  {
    label: "🐶 Assurance animaux",
    href: "/missions/animaux",
  },
  {
    label: "🏦 Assurance emprunteur",
    href: "/missions/assurance-emprunteur",
  },
  {
    label: "💼 Ambassadeur GSelect",
    href: "/missions/ambassadeur",
  },
  {
    label: "🕊️ Assurance obsèques",
    href: "/missions/assurance-obseques",
  },
  {
    label: "🏠 Crédit immobilier",
    href: "/missions/credit-immobilier",
  },
  {
    label: "📋 Diagnostic immobilier",
    href: "/missions/diagnostic-immobilier",
  },
  {
    label: "🏠 Assurance habitation",
    href: "/missions/habitation",
  },
  {
    label: "🛠️ Travaux & rénovation",
    href: "/missions/travaux",
  },
  {
    label: "👵 Mutuelle Senior",
    href: "/missions/mutuelle-senior",
  },
  {
    label: "💰 Épargne & retraite",
    href: "/missions/epargne-retraite",
  },
  {
    label: "🚗 Assurance auto",
    href: "/missions/auto",
  },
  {
    label: "🏍️ Assurance moto",
    href: "/missions/moto",
  },
  {
    label: "🚲 Mobilités douces",
    href: "/missions/mobilites-douces",
  },
  {
    label: "🔧 Services auto",
    href: "/missions/services-auto",
  },
  {
    label: "🏍️ Moto & équipement",
    href: "/missions/moto-equipement",
  },
  {
    label: "🎓 Formation",
    href: "/missions/formation",
  },
  {
    label: "🔐 Alarme & sécurité",
    href: "/missions/securite",
  },
  {
    label: "₿ Cryptomonnaies",
    href: "/missions/crypto",
  },
  {
    label: "🛡️ Cybersécurité",
    href: "/missions/cybersecurite",
  },
  {
    label: "🏢 Services aux entreprises",
    href: "/missions/services-entreprises",
  },
  {
    label: "🚚 Déménagement",
    href: "/missions/demenagement",
  },
  {
    label: "📦 Débarras",
    href: "/missions/debarras",
  },
];

const upcomingItems = [
  "❤️ Mutuelle santé",
  "🌐 Internet",
  "🏦 Banque",
  "📺 Streaming",
  "💻 Logiciels",
];

export default function PiloDrawer({
  visible,
  premium,
  onClose,
  onLogout,
}: Props) {
  function goTo(path: string) {
    onClose();
    router.push(path as never);
  }

  async function openMission(
    href: string
  ) {
    const url = `https://piloeco.com${href}`;

    try {
      const supported =
        await Linking.canOpenURL(url);

      if (!supported) {
        console.error(
          "Impossible d'ouvrir la mission :",
          url
        );

        return;
      }

      onClose();
      await Linking.openURL(url);
    } catch (error) {
      console.error(
        "Erreur ouverture mission :",
        error
      );
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.drawer}>
          {/* HEADER */}

          <View style={styles.header}>
            <View>
              <Text style={styles.brand}>
                PiloEco
              </Text>

              <Text style={styles.tagline}>
                Ton copilote d&apos;économies
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            {/* NAVIGATION PRINCIPALE */}

            <TouchableOpacity
              style={[
                styles.menuItem,
                styles.menuItemActive,
              ]}
              onPress={() => goTo("/")}
            >
              <Text style={styles.menuTextActive}>
                🏠 Mon Nid
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => goTo("/analyse")}
            >
              <Text style={styles.menuText}>
                🔎 Analyse
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
  style={styles.menuItem}
  onPress={() => goTo("/missions")}
>
  <Text style={styles.menuText}>
    🎯 Mes missions
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.menuItem}
  onPress={() => goTo("/assistant")}
>
  <Text style={styles.menuText}>
    🐦 Parler à Pilo
  </Text>
</TouchableOpacity>


            <View style={styles.divider} />

            {/* PREMIUM */}

            <View style={styles.premiumCard}>
              <Text style={styles.premiumKicker}>
                💎 PILO PREMIUM
              </Text>

              <Text style={styles.premiumTitle}>
                {premium
                  ? "Premium actif"
                  : "Pilo veille pour toi"}
              </Text>

              <Text style={styles.premiumText}>
                {premium
                  ? "Monitoring et PiloLife sont accessibles."
                  : "Débloque le suivi de tes contrats et tes projets."}
              </Text>

              <TouchableOpacity
                style={styles.premiumAction}
                onPress={() =>
                  goTo(
                    premium
                      ? "/monitoring"
                      : "/premium"
                  )
                }
              >
                <Text style={styles.premiumActionText}>
                  {premium
                    ? "📊 Ouvrir Monitoring"
                    : "Découvrir Premium"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.premiumSecondary}
                onPress={() =>
                  goTo(
                    premium
                      ? "/pilolife"
                      : "/premium"
                  )
                }
              >
                <Text style={styles.premiumSecondaryText}>
                  🌿 PiloLife
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* MISSIONS DISPONIBLES */}

            <Text style={styles.sectionKicker}>
              UNIVERS PILO
            </Text>

            <Text style={styles.sectionTitle}>
              Missions disponibles
            </Text>

            <Text style={styles.sectionHint}>
              Accède directement à la mission
              qui t&apos;intéresse.
            </Text>

            {availableItems.map((item) => (
              <TouchableOpacity
                key={item.href}
                style={styles.universeItem}
                activeOpacity={0.75}
                onPress={() =>
                  void openMission(
                    item.href
                  )
                }
              >
                <Text style={styles.universeText}>
                  {item.label}
                </Text>

                <Text style={styles.chevron}>
                  ›
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            {/* PROCHAINEMENT */}

            <Text style={styles.upcomingKicker}>
              PROCHAINEMENT
            </Text>

            <Text style={styles.sectionTitle}>
              En cours de partenariat
            </Text>

            <Text style={styles.sectionHint}>
              Pilo prépare de nouvelles
              solutions pour ces catégories.
            </Text>

            {upcomingItems.map((item) => (
              <View
                key={item}
                style={styles.upcomingItem}
              >
                <Text style={styles.upcomingText}>
                  {item}
                </Text>

                <View style={styles.upcomingBadge}>
                  <Text
                    style={
                      styles.upcomingBadgeText
                    }
                  >
                    En cours
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.divider} />

            {/* MON COMPTE */}

            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => goTo("/parametres")}
            >
              <Text style={styles.accountButtonText}>
                ⚙️ Mon compte
              </Text>

              <Text style={styles.chevron}>
                ›
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* DECONNEXION */}

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                onClose();
                onLogout();
              }}
            >
              <Text style={styles.logoutText}>
                Déconnexion
              </Text>
            </TouchableOpacity>

            <View style={styles.bottomSpace} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor:
      "rgba(0,0,0,0.45)",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  drawer: {
    width: "84%",
    maxWidth: 355,
    height: "100%",
    backgroundColor: "#020617",
    borderRightWidth: 1,
    borderRightColor: "#1e293b",
  },

  header: {
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },

  brand: {
    color: "#22c55e",
    fontSize: 28,
    fontWeight: "900",
  },

  tagline: {
    marginTop: 2,
    color: "#64748b",
    fontSize: 10,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  closeText: {
    color: "#cbd5e1",
    fontSize: 16,
    fontWeight: "900",
  },

  content: {
    padding: 16,
  },

  menuItem: {
    minHeight: 50,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderRadius: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  menuItemActive: {
    borderColor: "#22c55e",
    backgroundColor: "#16a34a",
  },

  menuText: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "900",
  },

  menuTextActive: {
    color: "#020617",
    fontSize: 13,
    fontWeight: "900",
  },

  divider: {
    height: 1,
    marginVertical: 16,
    backgroundColor: "#1e293b",
  },

  premiumCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#7e22ce",
    backgroundColor: "#17112b",
  },

  premiumKicker: {
    color: "#c084fc",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  premiumTitle: {
    marginTop: 7,
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },

  premiumText: {
    marginTop: 6,
    color: "#c4b5fd",
    fontSize: 10,
    lineHeight: 16,
  },

  premiumAction: {
    marginTop: 14,
    minHeight: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a855f7",
  },

  premiumActionText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  premiumSecondary: {
    marginTop: 8,
    minHeight: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7e22ce",
  },

  premiumSecondaryText: {
    color: "#e9d5ff",
    fontSize: 11,
    fontWeight: "900",
  },

  sectionKicker: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  upcomingKicker: {
    color: "#fbbf24",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.8,
  },

  sectionTitle: {
    marginTop: 5,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  sectionHint: {
    marginTop: 5,
    marginBottom: 8,
    color: "#64748b",
    fontSize: 9,
    lineHeight: 14,
  },

  universeItem: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#0f172a",
  },

  universeText: {
    flex: 1,
    paddingRight: 10,
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "800",
  },

  chevron: {
    color: "#475569",
    fontSize: 19,
    fontWeight: "900",
  },

  upcomingItem: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#0f172a",
  },

  upcomingText: {
    flex: 1,
    color: "#64748b",
    fontSize: 11,
    fontWeight: "800",
  },

  upcomingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#78350f",
    backgroundColor: "#451a03",
  },

  upcomingBadgeText: {
    color: "#fbbf24",
    fontSize: 8,
    fontWeight: "900",
  },

  accountButton: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
  },

  accountButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
  },

  logoutButton: {
    minHeight: 46,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0f172a",
  },

  logoutText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "900",
  },

  bottomSpace: {
    height: 30,
  },
});