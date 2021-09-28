import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getLastProductApi } from "../../api/product";
import ListProduct from "./ListProduct";

export default function NewProducts() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductApi(2);
      setProducts(response);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevos productos</Text>
      {products && <ListProduct products={products}></ListProduct>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 15,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 12,
  },
});
