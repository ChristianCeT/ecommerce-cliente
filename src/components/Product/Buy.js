import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import colors from "../../styles/colors";
import Toast from "react-native-root-toast";
import { addProductCartApi } from "../../api/cart";

export default function Buy(props) {
  const { product, quantity } = props;

  const addProductCart = async () => {
    const response = await addProductCartApi(product._id, quantity);

    if (response) {
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
        backgroundColor: "green",
        textColor: "white",
        shadow: true,
        opacity: 0.8,
      });
    } else {
      Toast.show("Error al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
        backgroundColor: "red",
        textColor: "white",
        shadow: true,
        opacity: 0.8,
      });
    }
  };
  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addProductCart}
        icon="cart"
      >
        Añadir a la cesta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnBuyContent: {
    backgroundColor: colors.primary,
    paddingVertical: 1,
    borderRadius: 10,
  },

  btnLabel: {
    fontSize: 18,
  },

  btn: {
    marginTop: 20,
    borderRadius: 10,
  },
});
