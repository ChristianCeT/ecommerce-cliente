import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import AddressList from "../../components/Addresses/AddressList";
import { getAddressesApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";
import Colors from "../../styles/colors";
import logo from "../../../assets/logos.png";

export default function Addresses() {
  const [addresses, setAddresses] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
        setReloadAddress(false);
      })();
    }, [reloadAddress])
  );

  return (
    <ScrollView style={styles.container}>
      <Image style={formStyles.logo} source={logo}></Image>
      <Text style={styles.title}>Mis direcciones</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("add-address")}
      >
        <View style={styles.addAddress}>
          <Text style={styles.addAddressText}>Añadir una dirección</Text>
          <IconButton
            icon="arrow-right"
            color={colors.primary}
            size={19}
          ></IconButton>
        </View>
      </TouchableWithoutFeedback>
      {!addresses ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
        ></ActivityIndicator>
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}>Crea tu primera dirección</Text>
      ) : (
        <AddressList
          addresses={addresses}
          setReloadAddress={setReloadAddress}
        ></AddressList>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 20,
  },

  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addAddressText: {
    fontSize: 16,
  },

  loading: {
    marginTop: 20,
  },

  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
