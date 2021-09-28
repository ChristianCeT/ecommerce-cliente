import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { map } from "lodash";
import { getSearchHistoryApi } from "../../api/search";
import colors from "../../styles/colors";

export default function SearchHistory(props) {
  const { showHistory, containerHeight, onSearch } = props;

  const [history, setHistory] = useState(null);

  useEffect(() => {
    if (showHistory) {
      (async () => {
        const response = await getSearchHistoryApi();
        setHistory(response);
      })();
    }
  }, [showHistory]);
  return (
    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        { top: containerHeight },
      ]}
    >
      {history &&
        map(history, (item, index) => (
          <TouchableNativeFeedback
            key={index}
            onPress={() => onSearch(item.search)}
          >
            <View style={styles.historyItem}>
              <Text style={styles.text}>{item.search}</Text>
              <AwesomeIcon name="arrow-right" size={16}></AwesomeIcon>
            </View>
          </TouchableNativeFeedback>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },

  history: {
    position: "absolute",
    backgroundColor: colors.bgLight,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  historyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0.3,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
