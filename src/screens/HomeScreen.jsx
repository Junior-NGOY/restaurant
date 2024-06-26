import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeIcon from "../components/HomeIcon";
import HomeSearch from "../components/HomeSearch";
import HomeBanner from "../components/HomeBanner";
import ProductsTitle from "../components/ProductsTitle";
import ProductsCarousel from "../components/ProductsCarousel";
import { fruits, vegetables } from "../utils/Data";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import MenuItem from "../components/MenuItem";

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const navigation = useNavigation();
  const cart = useSelector((state) => state.CartSlice);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "product"), orderBy("date", "desc"));
      const catSnap = onSnapshot(q, (querySnapshot) => {
        // const isOffline = querySnapshot.metadata.hasPendingWrites
        querySnapshot.forEach((doc) => {
          setItems(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F0F0F0",
        marginTop: 0,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Nom du restaurant
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("login")}
          style={{ marginLeft: "auto", marginRight: 7 }}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo",
            }}
          />
        </Pressable>
      </View>

      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Recherche d'un plat ou plus" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          // paddingHorizontal: 20,
          paddingTop: 10,
        }}
      >
        <View style={{ gap: 20, paddingBottom: 20 }}>
          {/*  <HomeIcon /> */}
          {/*  <HomeSearch /> */}
          {/* <HomeBanner />
          <ProductsTitle title="Exclusive Offer" />
          <ProductsCarousel data={fruits} />
          <ProductsTitle title="Best Selling" />
          <ProductsCarousel data={vegetables} /> */}
        </View>

        {filteredFoods?.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 328,
            //borderColor: "#D0D0D0",
            position: "absolute",
            //  margin: 16,
            // left: 0,
            // bottom: 0,
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | FC {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Proceder au paiement
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Voir détails
            </Text>
          </Pressable>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
