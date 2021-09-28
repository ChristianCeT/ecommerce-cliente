import React, { useState, useCallback } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { getMeApi, updateUserApi } from "../../api/user";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";
import logo from "../../../assets/logos.png";
import { RootSiblingParent } from "react-native-root-siblings";

export default function ChangeUsername() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        await formik.setFieldValue("username", response.username);
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
        if (response.statusCode) throw "El nombre del usuario ya existe";
        navigation.goBack();
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
          backgroundColor: "red",
          textColor: "white",
          shadow: true,
          opacity: 0.8,
        });
        formik.setFieldError("username", true);
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
          label="Nombre de usuario"
          style={
            formik.errors.username
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.username ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("username", text)}
          value={formik.values.username}
          error={formik.errors.username}
        ></TextInput>
        <Button
          mode="contained"
          style={formStyles.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar nombre de usuario
        </Button>
      </View>
    </RootSiblingParent>
  );
}

function initialValues() {
  return {
    username: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().min(4, true).required(true),
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
