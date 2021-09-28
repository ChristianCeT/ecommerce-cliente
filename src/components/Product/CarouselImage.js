import React, { useState } from "react";
import { StyleSheet, Image, Dimensions, View, Platform } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { API_URL } from "../../utils/constants";
import { size } from "lodash";

const width = Dimensions.get("window").width;
const height = 470;

export default function CarouselImage(props) {
  const { images } = props;
  const [imageActive, setImageActive] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <Image
        style={styles.carouselImg}
        source={{ uri: `${API_URL}${item.url}` }}
      ></Image>
    );
  };

  return (
    <>
      <View style={styles.carousel}>
        <Carousel
          layout={"default"}
          data={images}
          sliderWidth={width}
          itemWidth={width}
          renderItem={renderItem}
          onSnapToItem={(index) => setImageActive(index)}
        ></Carousel>
      </View>
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={imageActive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.7}
      ></Pagination>
    </>
  );
}

const styles = StyleSheet.create({
  carouselImg: {
    width,
    height,
    resizeMode: "stretch",
    borderRadius: 10,
  },

  carousel: {
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
});
