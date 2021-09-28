import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
} from "react-native";
import Corusel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../utils/constants";
import { getBannerApi } from "../../api/home-banner";

const width = Dimensions.get("window").width;
const height = 160;

export default function Banners() {
  const [banners, setBanners] = useState(null);
  const [bannerActive, setBannerActive] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const response = await getBannerApi();
      setBanners(response);
    })();
  }, []);

  if (!banners) return null;

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.banner.url}` }}
        ></Image>
      </TouchableWithoutFeedback>
    );
  };

  const goToProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };
  return (
    <View style={styles.container}>
      <Corusel
        layout={"default"}
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setBannerActive(index)}
      ></Corusel>
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={bannerActive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.dot}
      ></Pagination>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  carousel: {
    width,
    height,
  },

  dotsContainer: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },

  dot: {
    backgroundColor: "#fff",
  },
});
