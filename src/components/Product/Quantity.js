import React, { useState } from "react";
import { StyleSheet, LogBox } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Quantity(props) {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  const { quantity, setQuantity } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(quantity);
  const [items, setItems] = useState([
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
  ]);

  return (
    <DropDownPicker
      items={items}
      open={open}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      containerStyle={styles.containerStyle}
      dropDownContainerStyle={styles.drowpDownPicker}
      style={styles.drowpDownPicker}
      labelStyle={styles.labelStyle}
      onChangeValue={(value) => setQuantity(value)}
    ></DropDownPicker>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 100,
  },

  drowpDownPicker: {
    backgroundColor: "#fafafa",
    zIndex: 2,
  },

  labelStyle: {
    color: "#000",
  },
});
