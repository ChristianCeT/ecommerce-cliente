import React from "react";
import { ScrollView } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import colors from "../../styles/colors";
import NewProducts from "../../components/Home/NewProducts";
import Banners from "../../components/Home/Banners";

export default function Home() {
  return (
    <>
      <StatusBar
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      ></StatusBar>
      <Search></Search>
      <ScrollView>
        <Banners></Banners>
        <NewProducts></NewProducts>
      </ScrollView>
    </>
  );
}
