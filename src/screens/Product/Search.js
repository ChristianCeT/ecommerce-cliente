import React, { useEffect, useState } from "react";
import { size } from "lodash";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import ScreenLoading from "../../components/ScreenLoading";
import ResultNotFound from "../../components/Search/ResultNotFound";
import ProductList from "../../components/Product/ProductList";
import { searchProductApi } from "../../api/search";

import colors from "../../styles/colors";

export default function SearchScreen(props) {
  const { route } = props;
  const { params } = route;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductApi(params.search);
      setProducts(response);
    })();
  }, [params.search]);

  return (
    <>
      <StatusBar
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      ></StatusBar>
      <Search currentSearch={params.search}></Search>
      {!products ? (
        <ScreenLoading>Buscando productos</ScreenLoading>
      ) : size(products) === 0 ? (
        <ResultNotFound search={params.search}></ResultNotFound>
      ) : (
        <ProductList products={products}></ProductList>
      )}
    </>
  );
}
