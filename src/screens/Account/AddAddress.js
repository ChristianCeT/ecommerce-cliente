import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import {
  addAddressApi,
  getAddressApi,
  updateAddressApi,
} from "../../api/address";
import { formStyles } from "../../styles";
import colors from "../../styles/colors";

export default function AddAddress(props) {
  const {
    route: { params },
  } = props;

  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState(true);
  const { auth } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (params?.idAddress) {
        setNewAddress(false);
        navigation.setOptions({ title: "Actualizar dirección" });
        const response = await getAddressApi(auth, params.idAddress);
        await formik.setFieldValue("_id", response._id);
        await formik.setFieldValue("title", response.title);
        await formik.setFieldValue("name_lastname", response.name_lastname);
        await formik.setFieldValue("address", response.address);
        await formik.setFieldValue("postal_code", response.postal_code);
        await formik.setFieldValue("city", response.city);
        await formik.setFieldValue("state", response.state);
        await formik.setFieldValue("district", response.district);
        await formik.setFieldValue("phone", response.phone);
      }
    })();
  }, [params]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        if (newAddress) await addAddressApi(auth, formData);
        else await updateAddressApi(auth, formData);
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    },
  });

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {params?.idAddress ? "Editar dirección" : "Nueva dirección"}
        </Text>
        <TextInput
          label="Título"
          style={
            formik.errors.title
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.title ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("title", text)}
          value={formik.values.title}
          error={formik.errors.title}
        ></TextInput>
        <TextInput
          label="Nombres y apellidos"
          style={
            formik.errors.name_lastname
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.name_lastname ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("name_lastname", text)}
          value={formik.values.name_lastname}
          error={formik.errors.name_lastname}
        ></TextInput>
        <TextInput
          label="Dirección"
          style={
            formik.errors.address
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.address ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          value={formik.values.address}
          error={formik.errors.address}
        ></TextInput>
        <TextInput
          label="Código postal"
          style={
            formik.errors.postal_code
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.postal_code ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("postal_code", text)}
          value={formik.values.postal_code}
          error={formik.errors.postal_code}
        ></TextInput>
        <TextInput
          label="Ciudad"
          style={
            formik.errors.city
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.city ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("city", text)}
          value={formik.values.city}
          error={formik.errors.city}
        ></TextInput>
        <TextInput
          label="Estado"
          style={
            formik.errors.state
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.state ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("state", text)}
          value={formik.values.state}
          error={formik.errors.state}
        ></TextInput>
        <TextInput
          label="Distrito"
          style={
            formik.errors.district
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.district ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("district", text)}
          value={formik.values.district}
          error={formik.errors.district}
        ></TextInput>
        <TextInput
          label="Teléfono"
          style={
            formik.errors.phone
              ? { ...formStyles.input, borderEndColor: "red" }
              : formStyles.input
          }
          outlineColor={colors.primary}
          theme={{
            colors: {
              primary: formik.errors.phone ? "red" : colors.primary,
            },
          }}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          value={formik.values.phone}
          error={formik.errors.phone}
          maxLength={9}
          keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
        ></TextInput>
        <Button
          mode="contained"
          style={[formStyles.btnSuccess, styles.btnSuccess]}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          {newAddress ? "Crear dirección" : "Actualizar dirección"}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

function initialValues() {
  return {
    title: "",
    name_lastname: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    district: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(),
    name_lastname: Yup.string().required(),
    address: Yup.string().required(),
    postal_code: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    district: Yup.string().required(),
    phone: Yup.string().min(9, true).required(),
  };
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
  },
  btnSuccess: {
    marginBottom: 20,
  },
});
