import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  Alert,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/CartSlice";

import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { myColors } from "../utils/MyColors";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state.CartSlice);

  const navigation = useNavigation();
  return (
    <>
      {/*    <View style={{ margin: 10 }}>
        <Pressable
          onPress={() =>
            navigation.navigate("PickUp", {
              id: item.id,
              name: item.name,
              image: item.image,
              rating: item.rating,
              time: item.time,
              adress: item.adress,
              cost_for_two: item.cost_for_two,
              cuisines: item.cuisines,
              menu: item.menu,
            })
          }
          style={{ flexDirection: "row" }}
        >
          <View>
            <ImageBackground
              imageStyle={{ borderRadius: 6 }}
              style={{ aspectRatio: 5 / 6, height: 100 }}
              source={{ uri: item.image }}
            >
              <AntDesign
                style={{ position: "absolute", top: 10, right: 10 }}
                name="hearto"
                size={24}
                color="white"
              />
            </ImageBackground>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.name}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
                {item.description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                //alignItems: "center",
                //justifyContent: "space-between",
                gap: 3,
                marginTop: 20,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFB6C1",
                  width: 162,
                  height: 32,
                  borderRadius: 11,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 23,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  CDF {item.price}
                </Text>
              </View>
              <View style={{ paddingLeft: 40 }}>
                {storeData.some((value) => value.name == item.name) ? (
                  <FontAwesome
                    name="minus-square"
                    size={33}
                    //color={myColors.primary}
                    onPress={() => {
                      console.log(storeData);
                      dispatch(removeFromCart(item));
                    }}
                  />
                ) : (
                  <FontAwesome
                    name="plus-square"
                    size={33}
                    //color={myColors.primary}
                    onPress={() => {
                      console.log(storeData);
                      dispatch(addToCart(item));
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </View> */}
      <View style={styles.board}>
        <View style={styles.movieCard}>
          <Image
            style={styles.tinyLogo}
            /* source={item?.image} */ source={{ uri: item?.image }}
          />
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 8,
              marginTop: 5,
            }}
          >
            <Text style={styles.cardTitle}>{item?.name}</Text>

            <Text style={styles.cardText}>
              {item?.description.slice(0, 70)}
            </Text>
            <Text style={{ fontWeight: "bold", color: "green", fontSize: 26 }}>
              {item?.price} FC
            </Text>
          </View>
          <Pressable style={styles.add}>
            <View style={{ paddingLeft: 0 }}>
              {storeData.some((value) => value.name == item.name) ? (
                <FontAwesome
                  name="minus-square"
                  size={33}
                  color={myColors.primary}
                  onPress={() => {
                    console.log(storeData);
                    dispatch(removeFromCart(item));
                  }}
                />
              ) : (
                <FontAwesome
                  name="plus-square"
                  size={33}
                  //color={myColors.primary}
                  onPress={() => {
                    console.log(storeData);
                    dispatch(addToCart(item));
                  }}
                />
              )}
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 19,
    width: 200,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    width: 200,
    //marginTop: 5,
    marginBottom: 15,
  },
  tinyLogo: {
    // width: 70,
    height: 100,
    margin: 3,
    aspectRatio: 5 / 6,
    /* 
    height: 130,
    width: 130, */
    borderRadius: 6,
  },
  add: {
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
    //backgroundColor: "#D0D0D0",
    backgroundColor: myColors.secondary,
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
