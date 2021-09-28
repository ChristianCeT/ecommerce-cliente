import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import {
  deleteProductCartApi,
  increaseProductCartApi,
  decreaseProductCartApi,
} from "../../api/cart";
import { API_URL } from "../../utils/constants";
import colors from "../../styles/colors";

export default function Product(props) {
  const { product, setReloadCart } = props;

  const calcPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: `${API_URL}${product.main_image.url}` }}
        ></Image>
      </View>

      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              S/{" "}
              {(
                calcPrice(product.price, product.discount) * product.quantity
              ).toFixed(2)}
            </Text>
          </View>
          {product.discount && (
            <View style={styles.containerDiscount}>
              <Text style={styles.discountText}>Ahorras: </Text>
              <Text style={styles.discountValue}>
                S/ {((product.price * product.discount) / 100).toFixed(2)} (
                {product.discount}%)
              </Text>
            </View>
          )}
        </View>

        <View style={styles.btnContainer}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="minus"
              color="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={decreaseProductCart}
            ></IconButton>
            <TextInput
              style={
                Platform.OS === "ios"
                  ? { ...styles.inputQuantity, paddingHorizontal: 10 }
                  : { ...styles.inputQuantity, marginLeft: 10 }
              }
              value={product.quantity.toString()}
            ></TextInput>
            <IconButton
              icon="plus"
              color="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={increaseProductCart}
            ></IconButton>
          </View>
          <Button color="#b12704" mode="contained" onPress={deleteProductCart}>
            Eliminar
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },

  containerImage: {
    width: "40%",
    height: 170,
    backgroundColor: "#ebebeb",
    padding: 5,
    borderRadius: 5,
  },

  image: {
    height: "100%",
    resizeMode: "contain",
  },

  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
  },

  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },

  currentPrice: {
    fontSize: 18,
    color: "#b12704",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },

  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },

  btnQuantity: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
  },

  inputQuantity: {
    paddingTop: 1,
    fontSize: 16,
  },

  containerDiscount: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },

  discountText: {
    fontSize: 14,
    color: "#747474",
  },

  discountValue: {
    fontSize: 14,
    color: "#747474",
    paddingLeft: 5,
  },
});
