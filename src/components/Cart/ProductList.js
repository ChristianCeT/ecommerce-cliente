import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../../components/ScreenLoading";
import Product from "../../components/Cart/Product";
import { getProductAPi } from "../../api/product";

export default function ProductList(props) {
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

  useEffect(() => {
    setProducts(null);

    (async () => {
      const productTemp = [];

      let totalPaymentTemp = 0;

      for await (const product of cart) {
        const response = await getProductAPi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
        const price = calcPrice(response.price, response.discount);
        totalPaymentTemp += price * response.quantity;
      }

      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Productos:</Text>
      {!products ? (
        <ScreenLoading text="Cargando carrito"></ScreenLoading>
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          ></Product>
        ))
      )}
    </View>
  );
}

function calcPrice(price, discount) {
  if (!discount) return price;
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
