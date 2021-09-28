import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Addresses from "../screens/Account/Addresses";
import AddAddress from "../screens/Account/AddAddress";
import colors from "../styles/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: "Cuenta",
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{
          title: "Cambiar nombre y apellidos",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{
          title: "Cambiar correo electrónico",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{
          title: "Cambiar nombre de usuario",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: "Cambiar contraseña",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{
          title: "Mis direcciones",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{
          title: "Nueva direccion",
        }}
      ></Stack.Screen>
    </Stack.Navigator>

    // RECUERDA QUE TIENES QUE PONER UN KEYBOARDAVOID SELECT EN LOS COMPONENTES.
  );
}
