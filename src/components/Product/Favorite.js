import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import useauth from "../../hooks/useAuth";
import { size } from "lodash";
import {
  addFavoriteApi,
  isFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorites";

export default function Favorite(props) {
  const { product } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { auth } = useauth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product._id);
      if (size(response) === 0) setIsFavorite(false);
      else setIsFavorite(true);
    })();
  }, [product]);

  const addFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await addFavoriteApi(auth, product._id);
        setIsFavorite(true);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await deleteFavoriteApi(auth, product._id);
        setIsFavorite(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  if (isFavorite === undefined) return null;

  return (
    <View style={{ zIndex: 1 }}>
      <Button
        mode="contained"
        contentStyle={
          isFavorite
            ? styles.btnDeleteFavoritesContent
            : styles.btnAddFavoritesContent
        }
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={isFavorite ? deleteFavorite : addFavorite}
        loading={loading}
        icon={isFavorite ? "trash-can" : "heart"}
      >
        {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 1,
    borderRadius: 10,
  },

  btnDeleteFavoritesContent: {
    backgroundColor: "#c40000",
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
