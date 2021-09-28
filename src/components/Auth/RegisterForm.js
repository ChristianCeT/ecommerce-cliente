import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { registerApi } from "../../api/user";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";

export default function RegisterForm(props) {
  const { changeForm } = props;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await registerApi(formData);
        changeForm();
      } catch (error) {
        setLoading(false);
        Toast.show("Error al registrar el usuario", {
          position: Toast.positions.CENTER,
          backgroundColor: "red",
          textColor: "white",
          shadow: true,
          opacity: 0.8,
        });
      }
    },
  });

  return (
    <View>
      <RootSiblingParent>
        <TextInput
          label="Email"
          style={
            formik.errors.email
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: { primary: formik.errors.email ? "red" : colors.primary },
          }}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        ></TextInput>

        <TextInput
          label="Nombre de usuario"
          style={
            formik.errors.username
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: { primary: colors.primary },
          }}
          onChangeText={(text) => formik.setFieldValue("username", text)}
          value={formik.values.username}
          error={formik.errors.username}
        ></TextInput>

        <TextInput
          label="Contraseña"
          style={
            formik.errors.password
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          secureTextEntry
          outlineColor={colors.primary}
          theme={{ colors: { primary: colors.primary } }}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        ></TextInput>

        <TextInput
          label="Repetir contraseña"
          style={
            formik.errors.repeatPassword
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          secureTextEntry
          outlineColor={colors.primary}
          theme={{ colors: { primary: colors.primary } }}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        ></TextInput>

        <Button
          mode="contained"
          style={formStyles.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Registrarse
        </Button>

        <Button
          mode="contained"
          style={formStyles.btnText}
          labelStyle={formStyles.btnTextLabel}
          onPress={changeForm}
        >
          INICIAR SESIÓN
        </Button>
      </RootSiblingParent>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
