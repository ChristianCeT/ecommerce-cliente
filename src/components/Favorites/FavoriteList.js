import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { map } from "lodash";
import Product from "./Product";

export default function FavoriteList(props) {
  const { products, setReloadFavorites } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de favoritos</Text>
      {map(products, (item) => (
        <Product
          key={item._id}
          item={item}
          setReloadFavorites={setReloadFavorites}
        ></Product>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
