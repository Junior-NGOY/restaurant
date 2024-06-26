import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { myColors } from "../utils/MyColors";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Print from "expo-print";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const html = `<html><head></head> <body><h1>Likambo ya nga na mama</h1></body></html>`;

const OrderplacedScreen = () => {
  const [selectedPrinter, setSelectedPrinter] = React.useState();
  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  };
  const nav = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      nav.navigate("PDF");
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="white" />
      <MaterialIcons name="verified" size={90} color={myColors.primary} />
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Congrats,Your Order Places Successfully!!
      </Text>
    </View>
  );
};

export default OrderplacedScreen;
