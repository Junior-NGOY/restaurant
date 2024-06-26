import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { Store } from "./src/redux/Store";
import Navigation from "./src/Navigation";
import { theme } from "./src/utils/theme";

export default function App() {
  return (
    <StoreProvider store={Store}>
      <PaperProvider theme={theme}>
        <Navigation />
        <StatusBar style="auto" />
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
