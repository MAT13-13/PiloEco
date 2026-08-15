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

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    const cleanEmail = email.trim().toLowerCase();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Informations manquantes",
        "Remplis tous les champs pour créer ton compte."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Mot de passe trop court",
        "Choisis un mot de passe d’au moins 6 caractères."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Mots de passe différents",
        "Les deux mots de passe ne correspondent pas."
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            first_name: cleanFirstName,
            last_name: cleanLastName,
          },
        },
      });

      if (error) {
        Alert.alert("Inscription impossible", error.message);
        return;
      }

      if (!data.session) {
        Alert.alert(
          "Compte créé",
          "Ton compte a été créé. Vérifie ton email si une confirmation est demandée."
        );

        router.replace("/login");
        return;
      }

      router.replace("/");
    } catch {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue pendant la création du compte."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.brand}>PiloEco</Text>
      <Text style={styles.subtitle}>Ton copilote d'économies</Text>

      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#64748b"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#64748b"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />

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
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor="#64748b"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {loading ? "Création..." : "Créer mon compte"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => router.replace("/login")}
        disabled={loading}
      >
        <Text style={styles.loginLinkText}>
          J’ai déjà un compte
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
    marginBottom: 20,
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
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

  loginLink: {
    marginTop: 18,
    alignItems: "center",
  },

  loginLinkText: {
    color: "#22c55e",
    fontSize: 14,
    fontWeight: "700",
  },
});