import { View, Text, Image } from "react-native";
import React from "react";
//import { Drawer } from "react-native-paper";
//import "react-native-gesture-handler";
import User from "../assets/beto.jpeg";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FoodListScreen from "../screens/FoodListScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View
              style={{
                height: 230,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={User}
                style={{
                  // marginTop:20,
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                Junior NGOY
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                Product Manager
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                Shop 1
              </Text>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Accueil"
        component={DashboardScreen}
        options={{
          drawerLabel: "Accueil",
          title: "Tableau de bord",
          drawerIcon: () => (
            <FontAwesome name="home" size={20} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Sell"
        component={HomeScreen}
        options={{
          drawerLabel: "Vente",
          title: "Opérations de vente",
          drawerIcon: () => (
            <AntDesign name="shoppingcart" size={20} color="#808080" />
          ),
        }}
      />

      <Drawer.Screen
        name="Products"
        component={FoodListScreen}
        options={{
          drawerLabel: "Produit",
          title: "Opération sur les produits",
          drawerIcon: () => (
            <FontAwesome name="product-hunt" size={20} color="#808080" />
          ),
        }}
      />
      {/* 
      <Drawer.Screen
        name="Rapports"
        component={Home}
        options={{
          drawerLabel: "Rapport",
          title: "Rapport d'activités ",
          drawerIcon: () => (
            <MaterialIcons name="category" size={20} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Utilisateurs"
        component={Home}
        options={{
          drawerLabel: "Utilisateurs",
          title: "Liste des commandes",
          groupName: "Section 1",
          drawerIcon: () => (
            <MaterialIcons name="point-of-sale" size={20} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Aide"
        component={Home}
        options={{
          drawerLabel: "Depenses",
          title: "Rapport des Depenses",
          groupName: "Section 1",
          drawerIcon: () => (
            <FontAwesome name="money" size={20} color="#808080" />
          ),
        }}
      />
      <Drawer.Screen
        name="Confidentialité"
        component={Home}
        options={{
          drawerLabel: "Rapport",
          title: "Rapport des ventes",
          groupName: "Section 1",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="file-document-outline"
              size={20}
              color="#808080"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Deconnexion"
        component={Home}
        options={{
          drawerLabel: "Quitter",
          title: "Quitter",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="exit-to-app"
              size={20}
              color="#808080"
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
  /* const [active, setActive] = React.useState('');

    return (
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === 'first'}
          onPress={() => setActive('first')}
        />
        <Drawer.Item
          label="Second Item"
          active={active === 'second'}
          onPress={() => setActive('second')}
        />
      </Drawer.Section>
    ); */
};
//function MyDrawer() {
/*  return (
      <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View
              style={{
                height: 230,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={User}
                style={{
                 // marginTop:20,
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                Junior NGOY
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                Product Manager
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                   
                }}
              >
                Shop 1
              </Text>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
      >
        <Drawer.Screen name="Accueil" component={Home}  
        options={{
          drawerLabel: "Accueil",
          title: "Tableau de bord",
          drawerIcon: () => (
            <FontAwesome name="home" size={20} color="#808080" />
          ),
        }} />
        <Drawer.Screen name="Sell" component={Home}
           options={{
            drawerLabel: "Vente",
            title: "Opérations de vente",
            drawerIcon: () => (
              <AntDesign name="shoppingcart" size={20} color="#808080" />
            ),
          }}
        />
          <Drawer.Screen name="Products" component={FoodList}
          options={{
            drawerLabel: "Produit",
            title: "Opération sur les produits",
            drawerIcon: () => (
              <FontAwesome name="product-hunt" size={20} color="#808080" />
            ),
          }}
        />
        <Drawer.Screen name="Rapports" component={Home}
             options={{
              drawerLabel: "Rapport",
              title: "Rapport d'activités ",
              drawerIcon: () => (
                <MaterialIcons name="category" size={20} color="#808080" />
              ),
            }}
        />
        <Drawer.Screen name="Utilisateurs" component={Home} 
           options={{
            drawerLabel: "Utilisateurs",
            title: "Liste des commandes",
            groupName: "Section 1",
            drawerIcon: () => (
              <MaterialIcons name="point-of-sale" size={20} color="#808080" />
            ),
          }}
        />
        <Drawer.Screen name="Aide" component={Home}
           options={{
            drawerLabel: "Depenses",
            title: "Rapport des Depenses",
            groupName: "Section 1",
            drawerIcon: () => (
              <FontAwesome name="money" size={20} color="#808080" />
            ),
          }}
        />
        <Drawer.Screen name="Confidentialité" component={Home} 
           options={{
            drawerLabel: "Rapport",
            title: "Rapport des ventes",
            groupName: "Section 1",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="file-document-outline"
                size={20}
                color="#808080"
              />
            ),
          }}
        />
        <Drawer.Screen name="Deconnexion" component={Home} 
          options={{
            drawerLabel: "Quitter",
            title: "Quitter",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="exit-to-app"
                size={20}
                color="#808080"
              />
            ),
          }}
        />
         
      </Drawer.Navigator>
    ); */
// }
export default MyDrawer;
