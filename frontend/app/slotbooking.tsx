import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function slotbooking() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://bookings.edu9.in/portal-embed#/2026" }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
