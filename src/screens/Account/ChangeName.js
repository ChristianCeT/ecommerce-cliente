import React, { useState, useCallback } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useFormik } from "formik";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";
import logo from "../../../assets/logos.png";

export default function ChangeName() {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        if (response.name && response.lastname) {
          await formik.setFieldValue("name", response.name);
          await formik.setFieldValue("lastname", response.lastname);
        }
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      try {
        await updateUserApi(auth, formData);
        console.log("ok");
      } catch (error) {
        console.log("Error");
      }
    },
  });
  return (
    <View style={styles.container}>
      <Image
        style={{ ...formStyles.logo, height: 70, marginBottom: 15 }}
        source={logo}
      ></Image>

      <TextInput
        label="Nombre"
        style={
          formik.errors.name
            ? { ...formStyles.input, borderEndColor: "red" }
            : formStyles.input
        }
        outlineColor={colors.primary}
        theme={{
          colors: {
            primary: formik.errors.name ? "red" : colors.primary,
          },
        }}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      ></TextInput>

      <TextInput
        label="Apellidos"
        style={
          formik.errors.lastname
            ? { ...formStyles.input, borderEndColor: "red" }
            : formStyles.input
        }
        outlineColor={colors.primary}
        theme={{
          colors: {
            primary: formik.errors.lastname ? "red" : colors.primary,
          },
        }}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      ></TextInput>

      <Button
        mode="contained"
        style={formStyles.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Cambiar nombre y apellidos
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
});
