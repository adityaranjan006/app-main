import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Home } from "./src/modules/Home";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0A205F", "#000000"]}>
        <StatusBar translucent style="inverted" />
        <Home />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
