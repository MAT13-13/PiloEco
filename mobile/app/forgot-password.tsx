import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleResetPassword() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      Alert.alert(
        "Email manquant",
        "Entre ton adresse email."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanEmail
      );

      if (error) {
        Alert.alert(
          "Envoi impossible",
          "Impossible d'envoyer l'email pour le moment. Réessaie dans quelques instants."
        );
        return;
      }

      setSent(true);

      Alert.alert(
        "Email envoyé",
        "Si un compte correspond à cette adresse, tu vas recevoir un email pour réinitialiser ton mot de passe."
      );
    } catch {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue pendant l'envoi de l'email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.brand}>PiloEco</Text>
      <Text style={styles.subtitle}>Ton copilote d'économies</Text>

      <Text style={styles.title}>Mot de passe oublié ?</Text>

      <Text style={styles.description}>
        Entre l'adresse email associée à ton compte PiloEco.
        Nous t'enverrons un lien pour choisir un nouveau mot de passe.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        editable={!loading}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.buttonDisabled,
        ]}
        onPress={handleResetPassword}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Envoi..."
            : sent
              ? "Renvoyer l'email"
              : "Recevoir le lien"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/login")}
        disabled={loading}
      >
        <Text style={styles.backButtonText}>
          ← Retour à la connexion
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 24,
    justifyContent: "center",
  },

  brand: {
    color: "#22c55e",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 4,
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
  },

  title: {
    marginTop: 40,
    marginBottom: 12,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
  },

  description: {
    marginBottom: 22,
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 21,
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
  },

  button: {
    marginTop: 8,
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#020617",
    fontSize: 15,
    fontWeight: "900",
  },

  backButton: {
    marginTop: 22,
    alignItems: "center",
  },

  backButtonText: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "700",
  },
});