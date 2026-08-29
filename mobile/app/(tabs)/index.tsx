import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Linking,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (canGoBack) {
          webViewRef.current?.goBack();
          return true;
        }

        return false;
      }
    );

    return () => subscription.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <WebView
        ref={webViewRef}
        source={{ uri: "https://piloeco.com/dashboard" }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        cacheEnabled
        incognito={false}
        startInLoadingState
        pullToRefreshEnabled
        onNavigationStateChange={(navigationState) => {
          setCanGoBack(navigationState.canGoBack);
        }}
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url;

          const isPiloEco =
            url.startsWith("https://piloeco.com") ||
            url.startsWith("http://piloeco.com") ||
            url === "about:blank";

          if (!isPiloEco) {
            Linking.openURL(url);
            return false;
          }

          return true;
        }}
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