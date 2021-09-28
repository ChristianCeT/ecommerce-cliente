import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { RootSiblingParent } from "react-native-root-siblings";
import { loginApi } from "../../api/user";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";

export default function LoginForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await loginApi(formData);
        if (response.statusCode) throw "Usuario o contraseña incorrectos";
        login(response);
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
    <View>
      <RootSiblingParent>
        <TextInput
          label="Email o nombre de usuario"
          style={
            formik.errors.identifier
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.identifier ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("identifier", text)}
          value={formik.values.identifier}
          error={formik.errors.identifier}
        ></TextInput>

        <TextInput
          label="Contraseña"
          style={
            formik.errors.password
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          secureTextEntry
          theme={{
            colors: {
              primary: formik.errors.password ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        ></TextInput>

        <Button
          mode="contained"
          style={formStyles.btnSuccess}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Iniciar sesión
        </Button>

        <Button
          mode="contained"
          style={formStyles.btnText}
          labelStyle={formStyles.btnTextLabel}
          onPress={changeForm}
        >
          Registrarse
        </Button>
      </RootSiblingParent>
    </View>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
