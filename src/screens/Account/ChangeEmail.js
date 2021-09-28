import React, { useState, useCallback } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { formStyles } from "../../styles";
import logo from "../../../assets/logos.png";

export default function ChangeEmail() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        await formik.setFieldValue("email", response.email);
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) throw "El email ya existe";
        navigation.goBack();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
          backgroundColor: "red",
          textColor: "white",
          shadow: true,
          opacity: 0.8,
        });
        formik.setFieldError("email", true);
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
          label="Correo electrónico"
          style={
            formik.errors.email
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.email ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        ></TextInput>
        <Button
          mode="contained"
          style={formStyles.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar correo electrónico
        </Button>
      </View>
    </RootSiblingParent>
  );
}

function initialValues() {
  return {
    email: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
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
