import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, query, onSnapshot, doc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { theme } from "../utils/theme";
import { db, firebase, storage } from "../../firebaseConfig";
import DropDown from "react-native-paper-dropdown";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [img, setImg] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [category, setCategory] = useState([]);
  const [uploading2, setUploading2] = useState(false);

  const navigation = useNavigation();
  const emptyData = () => {
    setImg(null);
    setName("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setCategorie("");
  };

  const handleSaveProduct = async () => {
    setUploading2(true);
    uploadMedia();
    setUploading2(false);
    emptyData();
    Alert.alert("Produit ajouté avec succès !");
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      //const source = { uri: result.assets[0].uri };
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      try {
        await ref
          .put(blob)
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          })
          .then((downloadurl) => {
            addDoc(
              collection(db, "product"),
              {
                name: name,
                description: description,
                price: parseInt(price),
                quantity: parseInt(quantity),
                image: downloadurl,
                categorie: categorie,
                //categorie: doc(db, "category/" + categorie),
                date: Date.now(),
                //categorie: db.doc(`/category/${categorie}`).ref,
              },
              { merge: true }
            );
            return downloadurl;
          });
        setUploading(false);
        setImage(null);
      } catch (error) {}
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const q = query(collection(db, "category"));
      const catSnap = onSnapshot(q, (querySnapshot) => {
        // const isOffline = querySnapshot.metadata.hasPendingWrites
        querySnapshot.forEach((doc) => {
          /* setCategory(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          ); */
          category.push({
            label: doc.data().name,
            value: doc.id,
          });
        });
        //console.log(category);
        return category;
      });
    };
    fetchCategories();
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginTop: 50, marginBottom: 10, alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
            color: theme.colors.primary,
          }}
        >
          Ajout d'un produit
        </Text>
      </View>
      {uploading2 ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator animating={true} /* color={MD2Colors.red800} */ />
          <Text>Sauvegarde en cours ...</Text>
        </View>
      ) : (
        <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
          <TextInput
            mode="outlined"
            label="Libellé"
            returnKeyType="next"
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <TextInput
            label="Description"
            mode="outlined"
            returnKeyType="done"
            value={description}
            onChangeText={(value) => setDescription(value)}
            // error={!!password.error}
            // errorText={password.error}
            // secureTextEntry
          />
          <TextInput
            label="Prix"
            mode="outlined"
            returnKeyType="next"
            value={price}
            onChangeText={(value) => setPrice(value)}
            keyboardType="number-pad"
          />
          <TextInput
            label="Quantité"
            mode="outlined"
            returnKeyType="next"
            value={quantity}
            onChangeText={(value) => setQuantity(value)}
            keyboardType="number-pad"
          />
          <DropDown
            label={"Catégorie"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={categorie}
            setValue={setCategorie}
            list={category}
            style={{ width: "100%" }}
          />
          <Button icon="camera" onPress={pickImage} style={{ marginTop: 10 }}>
            Capture d'image
          </Button>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Text>{categorie}</Text>
          </View>
          <Pressable onPress={handleSaveProduct} style={{ marginTop: 10 }}>
            <Button mode="contained">Enregistrer</Button>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
