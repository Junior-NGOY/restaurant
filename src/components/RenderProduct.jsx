import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React from "react";
import User from "../assets/beto.jpeg";
import { useNavigation } from "@react-navigation/native";

const RenderProduct = ({ item }) => {
  const nav = useNavigation();
  const modifier = () => {
    nav.navigate("EditProduct", { item });
  };
  return (
    <View style={styles.board}>
      <View style={styles.movieCard}>
        <Image
          style={styles.tinyLogo}
          /* source={item?.image} */ source={{ uri: item?.image }}
        />
        <View
          style={{ flexDirection: "column", marginHorizontal: 8, marginTop: 5 }}
        >
          <Text style={styles.cardTitle}>{item?.name}</Text>

          <Text style={styles.cardText}>{item?.description.slice(0, 70)}</Text>
          <Text style={{ fontWeight: "bold", color: "green" }}>
            {item?.price} FC
          </Text>
        </View>
        <Pressable style={styles.edit}>
          <AntDesign name="edit" size={24} color="black" onPress={modifier} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    width: 200,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 12,
    width: 200,
    marginTop: 5,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    margin: 3,
    aspectRatio: 6 / 6,
    /* 
    height: 130,
    width: 130, */
    borderRadius: 65,
  },
  edit: {
    fontWeight: "400",
    marginTop: 5,
  },
  movieCard: {
    fonWeight: 100,
    width: "45",
    color: "#12263b",
    flex: 1,
    flexDirection: "row",
    aligItems: "center",
    flexGrow: 3,
    borderRadius: 10,
    padding: "10px",
    backgroundColor: "#D0D0D0",
    //backgroundColor: "#5BC0F8",
    margin: "10px",
    background: "#5BC0F8",
  },
  button: {
    alignItems: "center",
    width: 150,
    padding: 15,
    position: "absolute",
    backgroundColor: "#742dd2",
    borderRadius: 100,
    shadowColor: "#ffffff",
    shadowOffset: { width: -70, height: -70 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  board: {
    color: "#ffffff",
    background: "#12263b",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: 400,
    marginTop: 10,
    marginHorizontal: 10,
    borderColor: "#D0D0D0",
    //width: 360,
    //borderRadius: 30,
    /*     marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: 360,
    justifyContent: "center", */
  },
});
export default RenderProduct;
