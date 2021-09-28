import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import colors from "../../styles/colors";

export default function AugmentedReality() {
  return (
    <View style={styles.container}>
      {/* <IconButton
        icon="eye"
        color={colors.primary}
        size={30}
        onPress={() => console.log("PROXIMANMENTE")}
        animated={true}
        theme={{
          fonts: colors.bgDark,
        }}
      ></IconButton> */}

      <Button
        icon="eye"
        mode="outlined"
        style={styles.button}
        theme={{
          colors: { primary: colors.primary },
        }}
        onPress={() => console.log("PROXIMAMENTE")}
      >
        RA
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  button: {
    borderColor: colors.primary,
    borderRadius: 6,
    backgroundColor: colors.bgLight,
  },
});
