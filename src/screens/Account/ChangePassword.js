import React, { useState, useCallback } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";
import logo from "../../../assets/logos.png";
import { RootSiblingParent } from "react-native-root-siblings";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "Error al cambiar la contraseña";
        logout();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
          backgroundColor: "red",
          textColor: "white",
          shadow: true,
          opacity: 0.8,
        });
        setLoading(false);
      }
    },
  });
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Image
          style={{ ...formStyles.logo, height: 70, marginBottom: 15 }}
          source={logo}
        ></Image>

        <TextInput
          label="Nueva contraseña"
          style={
            formik.errors.password
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.password ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
          secureTextEntry
        ></TextInput>

        <TextInput
          label="Repetir contraseña"
          style={
            formik.errors.repeatPassword
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.repeatPassword ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
          secureTextEntry
        ></TextInput>
        <Button
          mode="contained"
          style={formStyles.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar contraseña
        </Button>
      </View>
    </RootSiblingParent>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(4, true).required(true),
    repeatPassword: Yup.string()
      .min(4, true)
      .oneOf([Yup.ref("password")], true)
      .required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexWrap: "nowrap",
    justifyContent: "center",
  },
});
