import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import MyDrawer from "./components/MyDrawer";
import Details from "./screens/DetailsScreen";
import CartScreen from "./screens/CartScreen";
import Orderplaced from "./screens/OrderplacedScreen";
import PdfScreen from "./screens/PdfScreen";
import AddProductScreen from "./screens/AddProductScreen";
import EditProductScreen from "./screens/EditProductScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderPlaced" component={Orderplaced} />
        <Stack.Screen name="PDF" component={PdfScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        {/* <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EditFood" component={EditFood} />
        <Stack.Screen name="DetailsFood" component={DetailsFood} />
        <Stack.Screen name="Print" component={Print} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
