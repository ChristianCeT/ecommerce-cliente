import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import Search from "../../components/Search";
import ScreenLoading from "../../components/ScreenLoading";
import CarouselImage from "../../components/Product/CarouselImage";
import StatusBar from "../../components/StatusBar";
import { getProductAPi } from "../../api/product";
import Price from "../../components/Product/Price";
import Quantity from "../../components/Product/Quantity";
import Buy from "../../components/Product/Buy";
import Favorite from "../../components/Product/Favorite";
import AugmentedReality from "../../components/Product/AugmentedReality";
import colors from "../../styles/colors";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Product(props) {
  const { route } = props;
  const { params } = route;
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(null);
    (async () => {
      const response = await getProductAPi(params.idProduct);
      setProduct(response);

      const arrayImage = [response.main_image];
      arrayImage.push(...response.images);
      setImages(arrayImage);
    })();
  }, [params]);

  return (
    <>
      <StatusBar
        backgroundColor={colors.bgDark}
        barstyle="light-content"
      ></StatusBar>
      <Search></Search>
      {!product ? (
        <ScreenLoading text="Cargando productos" size="large"></ScreenLoading>
      ) : (
        <ScrollView style={styles.container}>
          <RootSiblingParent>
            <Text style={styles.title}>{product.title}</Text>
            <CarouselImage images={images}></CarouselImage>
            <View style={styles.containerView}>
              <Price price={product.price} discount={product.discount}></Price>
              <View style={styles.cantAug}>
                <Quantity
                  quantity={quantity}
                  setQuantity={setQuantity}
                ></Quantity>
                <AugmentedReality></AugmentedReality>
              </View>
              <Buy product={product} quantity={quantity}></Buy>
              <Favorite product={product}></Favorite>
            </View>
          </RootSiblingParent>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    padding: 10,
  },
  containerView: {
    padding: 10,
    marginBottom: 20,
  },

  cantAug: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 7,
  },
});
