import { View, Text, Alert, Image, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  database,
  ref,
  deleteObject,
  storage,
  firebase,
} from "../../FirebaseConfig";
import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  querySnapshot,
} from "firebase/firestore";

const FoodComponent = ({ name, description, price, image, quantity, id }) => {
  const confirmation = (id) => {
    Alert.alert(
      //Title
      "Suppression d'un produit",

      //Body
      "Voulez-vous supprimer ce produit ?",
      [
        {
          text: "Oui",
          onPress: () => {
            deleteData(id);
          },
        },
        {
          text: "Annuler",
          /*   onPress: () => {
            deleteData();
          }, */
        },
      ]
    );
  };
  const deleteData = async (id) => {
    const docRef = doc(database, "product", id);
    //const docRef = query(database, "product", id.text);
    await deleteDoc(docRef)
      .then(() => {
        // Create a reference to the file to delete
        const desertRef = ref(storage, "plan.jpg");

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            Alert.alert("Suppression faite avec succès !");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
        Alert.alert("Suppression faite avec succès !");
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const nav = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        //marginTop: 0,
      }}
    >
      <Image
        style={{
          height: 100,
          width: 100,
          alignSelf: "center",
          resizeMode: "contain",
          marginLeft: 5,
        }}
        source={{ uri: image }}
      />
      <View style={styles.item}>
        <View>
          <Text
            style={styles.title}
            onPress={() => {
              nav.navigate("DetailsFood", {
                name,
                description,
                price,
                image,
                quantity,
              });
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={2} style={{ color: "grey" }}>
            {description.length < 35
              ? `${description}`
              : `${description.substring(0, 32)}...`}
            /{quantity}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>CDF {price} </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingLeft: 150,
              position: "absolute",
            }}
          >
            <AntDesign
              name="edit"
              size={24}
              color="green"
              onPress={() => {
                nav.navigate("EditFood", {
                  name,
                  image,
                  description,
                  price,
                  quantity,
                });
              }}
            />
            <AntDesign
              name="delete"
              size={24}
              color="red"
              style={{ paddingLeft: 15 }}
              onPress={() => {
                confirmation(id);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: theme.colors.third,
  },
  item: {
    // backgroundColor: theme.colors.third,
    //padding: 5,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
  },
});
export default FoodComponent;
