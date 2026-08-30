import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Linking,
  Platform,
  StyleSheet,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const PILOECO_URL = "https://piloeco.com/dashboard";

function isPiloEcoUrl(url: string) {
  if (
    url === "about:blank" ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return true;
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    return (
      hostname === "piloeco.com" ||
      hostname === "www.piloeco.com" ||
      hostname.endsWith(".piloeco.com")
    );
  } catch {
    return false;
  }
}

function PiloEcoWebView() {
  const webViewRef = useRef<WebView>(null);

  const [canGoBack, setCanGoBack] = useState(false);

  const lastExternalUrlRef = useRef<string | null>(null);
  const lastExternalOpenAtRef = useRef(0);

  async function openExternalUrl(url: string) {
    try {
      /*
       * Certains liens target="_blank" peuvent déclencher plusieurs
       * événements presque simultanément.
       *
       * On bloque donc les doubles ouvertures.
       */
      const now = Date.now();

      if (
        lastExternalUrlRef.current === url &&
        now - lastExternalOpenAtRef.current < 1500
      ) {
        return;
      }

      lastExternalUrlRef.current = url;
      lastExternalOpenAtRef.current = now;

      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        console.warn("URL externe non supportée :", url);
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error(
        "Impossible d’ouvrir le lien externe :",
        error
      );
    }
  }

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (canGoBack) {
          webViewRef.current?.goBack();
          return true;
        }

        /*
         * Sur la première page :
         * le bouton retour Android ne ferme pas PiloEco.
         */
        return true;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [canGoBack]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      <StatusBar
        style="light"
        backgroundColor="#020617"
        translucent={false}
      />

      <WebView
        ref={webViewRef}

        source={{
          uri: PILOECO_URL,
        }}

        style={styles.webview}

        javaScriptEnabled={true}
        domStorageEnabled={true}

        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}

        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"

        incognito={false}

        startInLoadingState={true}
        pullToRefreshEnabled={true}

        /*
         * Important :
         * on garde les target="_blank" dans la WebView.
         *
         * Ensuite on décide nous-mêmes si l'URL doit sortir.
         */
        setSupportMultipleWindows={false}

        javaScriptCanOpenWindowsAutomatically={true}

        onNavigationStateChange={(navigationState) => {
          /*
           * Ici on ne touche PLUS aux URL externes.
           *
           * Cette fonction sert seulement au bouton retour Android.
           */
          if (isPiloEcoUrl(navigationState.url)) {
            setCanGoBack(
              navigationState.canGoBack
            );
          }
        }}

        onShouldStartLoadWithRequest={(request) => {
          const url = request.url;

          if (isPiloEcoUrl(url)) {
            return true;
          }

          /*
           * OHM, Google Play, partenaires, etc.
           *
           * La WebView reste sur PiloEco.
           * Android ouvre simplement le navigateur externe.
           */
          void openExternalUrl(url);

          return false;
        }}

        onContentProcessDidTerminate={() => {
          /*
           * iOS uniquement en pratique,
           * mais sans danger ici.
           */
          webViewRef.current?.reload();
        }}

        onRenderProcessGone={() => {
          /*
           * Android :
           * uniquement si le moteur WebView plante réellement.
           */
          webViewRef.current?.reload();
        }}
      />
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <PiloEcoWebView />
    </SafeAreaProvider>
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