import React, { useState } from "react";
import { View, Image, KeyboardAvoidingView, Platform } from "react-native";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import logo from "../../assets/logoe.png";
import { layoutStyle, formStyles } from "../styles";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  const changeForm = () => setShowLogin(!showLogin);

  return (
    <View style={layoutStyle.container}>
      <Image style={formStyles.logo} source={logo}></Image>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "null"}
      >
        {showLogin ? (
          <LoginForm changeForm={changeForm}></LoginForm>
        ) : (
          <RegisterForm changeForm={changeForm}></RegisterForm>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
