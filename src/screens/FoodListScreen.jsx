import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from "react-native-paper";
import Carousel from "../components/Carousel";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HomeSearch from "../components/HomeSearch";
import RenderProduct from "../components/RenderProduct";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const FoodListScreen = ({ tweet }) => {
  const { navigate } = useNavigation();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "product"), orderBy("date", "desc"));
      const catSnap = onSnapshot(q, (querySnapshot) => {
        // const isOffline = querySnapshot.metadata.hasPendingWrites
        querySnapshot.forEach((doc) => {
          setItems(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          // console.log(items);
        });
      });
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredFoods(
      items.filter(
        (food) => food.name.toLowerCase().includes(search.toLowerCase()) //||
        // food.city.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, items]);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 0 }}>
        {/* Search Bar */}
        <View
          style={{
            /*   
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            */
            margin: 10,
            borderRadius: 7,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          {/*   <TextInput
            placeholder="Recherche d'un produit"
            onChangeText={(value) => setSearch(value)}
          />
          <Feather name="search" size={24} color="#fd5c63" /> */}
          <HomeSearch />
        </View>
        {/* Image Carousel */}
        {/* <Carousel /> */}
        {/* FoodTypes Component */}
        {/*  <FoodTypes /> */}
        {/* QuickFood Component */}
        {/* Filter buttons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              borderRadius: 20,
              width: 120,
              justifyContent: "center",
            }}
          >
            <Text style={{ marginRight: 6 }}>Filtre</Text>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>

          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              width: 120,
            }}
          >
            <Text>Par Catégorie</Text>
          </Pressable>

          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
            }}
          >
            <Text>Trier par prix</Text>
          </Pressable>
        </View>

        {filteredFoods?.map((item, index) => (
          <RenderProduct key={index} item={item} />
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          navigate("AddProduct");
        }}
      />
    </>
  );
};

export default FoodListScreen;

const styles = StyleSheet.create({
  fab: {
    borderRadius: 40,
    width: 60,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
