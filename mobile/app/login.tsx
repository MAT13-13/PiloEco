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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert(
        "Informations manquantes",
        "Entre ton email et ton mot de passe."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        Alert.alert(
          "Connexion impossible",
          "Email ou mot de passe incorrect."
        );
        return;
      }

      router.replace("/");
    } catch {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue pendant la connexion."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.brand}>PiloEco</Text>
      <Text style={styles.subtitle}>Ton copilote d'économies</Text>

      <Text style={styles.title}>Connexion</Text>

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
        textContentType="password"
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.forgotPasswordText}>
          Mot de passe oublié ?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {loading ? "Connexion..." : "Se connecter"}
        </Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>ou</Text>
        <View style={styles.separatorLine} />
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.registerButtonText}>
          Créer un compte
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

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: 14,
  },

  forgotPasswordText: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "700",
  },

  button: {
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

  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#1e293b",
  },

  separatorText: {
    marginHorizontal: 12,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
  },

  registerButton: {
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },

  registerButtonText: {
    color: "#22c55e",
    fontSize: 15,
    fontWeight: "900",
  },
});