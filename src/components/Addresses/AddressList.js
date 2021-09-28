import React from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import { map } from "lodash";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { deleteAddressApi } from "../../api/address";
import colors from "../../styles/colors";

export default function AddressList(props) {
  const { addresses, setReloadAddress } = props;
  const { auth } = useAuth();
  const navigation = useNavigation();

  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminar dirección",
      `¿Estás seguro de que quieres eliminar la dirección ${address.title}?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => deleteAddress(address._id),
        },
      ],
      { cancelable: false }
    );
  };

  /* asdasdas */

  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAddress(true);
    } catch (error) {
      console.log(error);
    }
  };

  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress }); // pasar parametros solo funciona string o boleano
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Text>{address.name_lastname}</Text>
          <Text>{address.address}</Text>
          <View style={styles.blockline}>
            <Text>{address.district}, </Text>
            <Text>{address.postal_code}, </Text>
            {/* <Text>{address.state}</Text> */}
          </View>
          <Text>{address.city}</Text>
          <Text>Número de teléfono: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              color={colors.primary}
              onPress={() => goToUpdateAddress(address._id)}
            >
              Editar
            </Button>
            <Button
              mode="contained"
              color="#8B0000"
              onPress={() => deleteAddressAlert(address)}
            >
              Eliminar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 22,
  },

  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },

  blockline: {
    flexDirection: "row",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
