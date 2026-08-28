import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <WebView
        source={{ uri: "https://www.piloeco.com" }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        startInLoadingState
        pullToRefreshEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  webview: {
    flex: 1,
    backgroundColor: "#020617",
  },
});