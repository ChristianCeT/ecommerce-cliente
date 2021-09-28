import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "white",
    borderEndWidth: 3,
    borderEndColor: colors.primary,
    borderRadius: 6,
  },

  btnSuccess: {
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.dark,
  },

  btnText: {
    padding: 5,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 0.6,
    borderColor: colors.dark,
  },

  btnTextLabel: {
    color: colors.dark,
  },

  logo: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default formStyles;
