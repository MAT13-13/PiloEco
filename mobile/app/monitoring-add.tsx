import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

type MonitoringCatalogItem = {
  id: string;
  category: string;
  label: string;
  icon: string;
  provider_placeholder: string | null;
  offer_placeholder: string | null;
  sort_order: number;
  enabled: boolean;
};

export default function MonitoringAddScreen() {
  const [categories, setCategories] = useState<
    MonitoringCatalogItem[]
  >([]);

  const [category, setCategory] =
    useState("");

  const [catalogLoading, setCatalogLoading] =
    useState(true);

  const [catalogError, setCatalogError] =
    useState("");

  const [provider, setProvider] =
    useState("");

  const [
    monthlyPrice,
    setMonthlyPrice,
  ] = useState("");

  const [
    currentOffer,
    setCurrentOffer,
  ] = useState("");

  const [endDate, setEndDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadMonitoringCatalog() {
      try {
        setCatalogLoading(true);
        setCatalogError("");

        const { data, error } = await supabase
          .from("monitoring_catalog")
          .select(
            `
              id,
              category,
              label,
              icon,
              provider_placeholder,
              offer_placeholder,
              sort_order,
              enabled
            `
          )
          .eq("enabled", true)
          .order("sort_order", {
            ascending: true,
          });

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "Erreur monitoring_catalog :",
            error
          );

          setCatalogError(
            "Impossible de charger les catégories."
          );

          return;
        }

        const catalog =
          (data as MonitoringCatalogItem[] | null) ?? [];

        setCategories(catalog);

        if (catalog.length > 0) {
          setCategory((currentCategory) => {
            const stillExists = catalog.some(
              (item) =>
                item.category === currentCategory
            );

            if (stillExists) {
              return currentCategory;
            }

            const electricite = catalog.find(
              (item) =>
                item.category === "electricite"
            );

            return (
              electricite?.category ??
              catalog[0].category
            );
          });
        }
      } catch (error) {
        console.error(
          "Erreur chargement monitoring_catalog :",
          error
        );

        if (mounted) {
          setCatalogError(
            "Une erreur est survenue pendant le chargement."
          );
        }
      } finally {
        if (mounted) {
          setCatalogLoading(false);
        }
      }
    }

    void loadMonitoringCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  function selectCategory(
    newCategory: string
  ) {
    setCategory(newCategory);

    // On vide les champs pour éviter
    // de garder un fournisseur d'une autre catégorie.
    setProvider("");
    setCurrentOffer("");
  }

  async function saveContract() {
    if (!category) {
      Alert.alert(
        "Catégorie manquante",
        "Choisis une catégorie de contrat."
      );

      return;
    }

    if (!provider.trim()) {
      Alert.alert(
        "Fournisseur manquant",
        "Indique le fournisseur de ton contrat."
      );

      return;
    }

    if (!monthlyPrice.trim()) {
      Alert.alert(
        "Prix manquant",
        "Indique ce que tu paies actuellement par mois."
      );

      return;
    }

    const price = Number(
      monthlyPrice
        .replace(",", ".")
        .trim()
    );

    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      Alert.alert(
        "Prix invalide",
        "Indique un prix mensuel valide."
      );

      return;
    }

    const trimmedEndDate =
      endDate.trim();

    if (
      trimmedEndDate &&
      !/^\d{4}-\d{2}-\d{2}$/.test(
        trimmedEndDate
      )
    ) {
      Alert.alert(
        "Date invalide",
        "Utilise le format AAAA-MM-JJ, par exemple 2027-08-14."
      );

      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert(
          "Connexion requise",
          "Reconnecte-toi à PiloEco."
        );

        router.replace("/login");
        return;
      }

      const { error } = await supabase
        .from("monitoring_contracts")
        .insert({
          user_id: user.id,
          category,
          provider: provider.trim(),
          monthly_price: price,
          current_offer:
            currentOffer.trim() ||
            null,
          end_date:
            trimmedEndDate || null,
          better_offer: null,
          yearly_saving: 0,
          status:
            "Contrat surveillé",
          updated_at:
            new Date().toISOString(),
        });

      if (error) {
        console.error(
          "Erreur ajout monitoring :",
          error
        );

        Alert.alert(
          "Erreur",
          "Impossible d'ajouter ce contrat."
        );

        return;
      }

      Alert.alert(
        "Contrat ajouté ✅",
        "Pilo peut maintenant suivre ce contrat."
      );

      router.replace("/monitoring");
    } catch (error) {
      console.error(
        "Erreur Monitoring Add :",
        error
      );

      Alert.alert(
        "Erreur",
        "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  const selectedCategory =
    categories.find(
      (item) =>
        item.category === category
    );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.kicker}>
        📊 MONITORING
      </Text>

      <Text style={styles.title}>
        Ajouter un contrat
      </Text>

      <Text style={styles.subtitle}>
        Renseigne les informations principales.
        Pilo pourra ensuite suivre le prix,
        l'offre et l'échéance de ton contrat.
      </Text>

      {catalogLoading && (
        <View style={styles.catalogStateCard}>
          <ActivityIndicator
            size="small"
            color="#a855f7"
          />

          <Text style={styles.catalogStateText}>
            Chargement des catégories...
          </Text>
        </View>
      )}

      {!catalogLoading && catalogError ? (
        <View style={styles.catalogErrorCard}>
          <Text style={styles.catalogErrorText}>
            {catalogError}
          </Text>
        </View>
      ) : null}

      {/* CATÉGORIE */}

      <Text style={styles.label}>
        Catégorie
      </Text>

      <View style={styles.categories}>
        {categories.map((item) => {
          const active =
            category === item.category;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                selectCategory(
                  item.category
                )
              }
              activeOpacity={0.8}
              style={[
                styles.categoryButton,
                active &&
                  styles.categoryButtonActive,
              ]}
            >
              <Text
                style={
                  styles.categoryIcon
                }
              >
                {item.icon}
              </Text>

              <Text
                style={[
                  styles.categoryText,
                  active &&
                    styles.categoryTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* RAPPEL CATÉGORIE */}

      <View
        style={
          styles.selectedCategoryCard
        }
      >
        <Text
          style={
            styles.selectedCategoryIcon
          }
        >
          {selectedCategory?.icon ??
            "📄"}
        </Text>

        <View style={{ flex: 1 }}>
          <Text
            style={
              styles.selectedCategoryLabel
            }
          >
            CONTRAT SÉLECTIONNÉ
          </Text>

          <Text
            style={
              styles.selectedCategoryTitle
            }
          >
            {selectedCategory?.label ??
              "Contrat"}
          </Text>
        </View>
      </View>

      {/* FOURNISSEUR */}

      <Text style={styles.label}>
        Fournisseur
      </Text>

      <TextInput
        style={styles.input}
        placeholder={
          selectedCategory?.provider_placeholder ||
          "Ex. nom du fournisseur"
        }
        placeholderTextColor="#64748b"
        value={provider}
        onChangeText={setProvider}
        autoCapitalize="words"
      />

      {/* PRIX */}

      <Text style={styles.label}>
        Prix mensuel
      </Text>

      <View style={styles.priceContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="Ex. 90"
          placeholderTextColor="#64748b"
          keyboardType="decimal-pad"
          value={monthlyPrice}
          onChangeText={
            setMonthlyPrice
          }
        />

        <View style={styles.currencyBox}>
          <Text
            style={styles.currencyText}
          >
            €/mois
          </Text>
        </View>
      </View>

      {/* OFFRE */}

      <Text style={styles.label}>
        Offre actuelle
      </Text>

      <TextInput
        style={styles.input}
        placeholder={
          selectedCategory?.offer_placeholder ||
          "Ex. nom de ton offre"
        }
        placeholderTextColor="#64748b"
        value={currentOffer}
        onChangeText={
          setCurrentOffer
        }
      />

      <Text style={styles.optionalText}>
        Facultatif si tu ne connais pas le nom
        exact de ton offre.
      </Text>

      {/* ÉCHÉANCE */}

      <Text style={styles.label}>
        Date d'échéance
      </Text>

      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-JJ"
        placeholderTextColor="#64748b"
        value={endDate}
        onChangeText={setEndDate}
        keyboardType="numbers-and-punctuation"
      />

      <Text style={styles.optionalText}>
        Exemple : 2027-08-14. Tu peux laisser
        vide si ton contrat n'a pas d'échéance
        connue.
      </Text>

      {/* INFO */}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          🐦 Pourquoi Pilo te demande ça ?
        </Text>

        <Text style={styles.infoText}>
          Ces informations permettent à Pilo de
          conserver une référence de ton contrat
          actuel et de suivre son prix et son
          échéance dans le temps.
        </Text>
      </View>

      {/* ENREGISTRER */}

      <TouchableOpacity
        style={[
          styles.saveButton,
          (loading || catalogLoading || !category) &&
            styles.saveButtonDisabled,
        ]}
        onPress={saveContract}
        disabled={loading || catalogLoading || !category}
        activeOpacity={0.85}
      >
        <Text
          style={styles.saveButtonText}
        >
          {loading
            ? "Enregistrement..."
            : "Ajouter au Monitoring"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() =>
          router.back()
        }
      >
        <Text style={styles.cancelText}>
          Annuler
        </Text>
      </TouchableOpacity>

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
    padding: 20,
  },

  kicker: {
    color: "#c084fc",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },

  title: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 22,
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 20,
  },

  catalogStateCard: {
    marginBottom: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3b0764",
    backgroundColor: "#17112b",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  catalogStateText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "700",
  },

  catalogErrorCard: {
    marginBottom: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    backgroundColor: "#450a0a",
  },

  catalogErrorText: {
    color: "#fecaca",
    fontSize: 11,
    fontWeight: "800",
  },

  label: {
    marginTop: 18,
    marginBottom: 8,
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "800",
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  categoryButtonActive: {
    borderColor: "#a855f7",
    backgroundColor: "#3b0764",
  },

  categoryIcon: {
    fontSize: 13,
  },

  categoryText: {
    color: "#94a3b8",
    fontSize: 9,
    fontWeight: "800",
  },

  categoryTextActive: {
    color: "#e9d5ff",
  },

  selectedCategoryCard: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  selectedCategoryIcon: {
    fontSize: 26,
  },

  selectedCategoryLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  selectedCategoryTitle: {
    marginTop: 3,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  input: {
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 13,
  },

  priceContainer: {
    flexDirection: "row",
    gap: 8,
  },

  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 13,
  },

  currencyBox: {
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
  },

  currencyText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "900",
  },

  optionalText: {
    marginTop: 6,
    color: "#475569",
    fontSize: 9,
    lineHeight: 14,
  },

  infoCard: {
    marginTop: 24,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#14532d",
    backgroundColor: "#052e16",
  },

  infoTitle: {
    color: "#86efac",
    fontSize: 11,
    fontWeight: "900",
  },

  infoText: {
    marginTop: 7,
    color: "#bbf7d0",
    fontSize: 10,
    lineHeight: 17,
  },

  saveButton: {
    marginTop: 25,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#a855f7",
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  cancelButton: {
    marginTop: 10,
    paddingVertical: 13,
    alignItems: "center",
  },

  cancelText: {
    color: "#94a3b8",
    fontWeight: "800",
    fontSize: 11,
  },

  bottomSpace: {
    height: 40,
  },
});
