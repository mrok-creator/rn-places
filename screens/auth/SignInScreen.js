import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";

import { signIn } from "../../redux/auth/auth-operation";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function SignInScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Lora-Regular": require("../../assets/font/Lora-Regular.ttf"),
    "Lora-Medium": require("../../assets/font/Lora-Medium.ttf"),
    "Lora-Bold": require("../../assets/font/Lora-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    if (name.trim().length > 0 && password.trim().length > 0) {
      const newData = {
        email: name,
        password,
      };
      dispatch(signIn(newData));
      setName("");
      setPassword("");
      Keyboard.dismiss();
      setIsKeyboardShow(false);

      return;
    }
    Alert.alert(
      "Помилка входу",
      "А раптом ви зловмисник? \n Заповніть всі поля, щоб переконати нас)",
      [
        {
          text: "OK",
          onPress: () => console.log("Ok pressed"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeyboardShow(false);
      }}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../../assets/images/bg-art.jpg")}
          style={styles.img}
          resizeMode={"cover"}
        >
          <View
            style={{
              ...styles.form,
              ...Platform.select({
                ios: {
                  paddingBottom: isKeyboardShow ? 238 : 30,
                },
                android: {
                  paddingBottom: 32,
                },
              }),
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              // style={{
              //   ...Platform.select({
              //     ios: {
              //       paddingBottom: isKeyboardShow ? 120 : 0,
              //     },
              //   }),
              // }}
            >
              <View style={styles.headerTitle}>
                <Text style={styles.headerText}>Увійти до профілю</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Email"
                textContentType="emailAddress"
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#4E7D55"}
                onFocus={() => setIsKeyboardShow(true)}
              />

              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                textContentType="password"
                secureTextEntry={true}
                style={styles.input}
                keyboardAppearance={"dark"}
                placeholderTextColor={"#4E7D55"}
                onFocus={() => setIsKeyboardShow(true)}
              />

              {/* <Button title={"Login"} style={styles.btn} onPress={onLogin} /> */}
              <TouchableOpacity
                style={styles.btn}
                onPress={onLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={{
                  marginTop: 12,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Lora-Regular" }}>
                  Вперше в нас?
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#63D471",
                      fontFamily: "Lora-Bold",
                    }}
                  >
                    {"  "}Зареєструйся
                  </Text>
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#0F4F49",
  },

  img: {
    flex: 1,
    justifyContent: "flex-end",
  },

  form: {
    backgroundColor: "#0F4F49",
    // paddingBottom: 32,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  headerTitle: {
    alignItems: "center",
    marginBottom: 33,
    marginTop: 33,
  },
  headerText: {
    fontFamily: "Lora-Bold",
    color: "#fff",
    fontSize: 30,
  },

  input: {
    fontFamily: "Lora-Regular",
    marginHorizontal: 16,
    fontSize: 18,

    height: 45,
    paddingLeft: 20,

    borderWidth: 1,
    borderColor: "#63D471",

    borderRadius: 15,
    color: "#fff",
    marginBottom: 20,
  },

  btn: {
    height: 44,
    padding: 10,

    marginHorizontal: 50,
    alignItems: "center",

    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#63D471",
    borderRadius: 25,
  },

  btnTitle: {
    fontFamily: "Lora-Regular",
    color: "#fff",
    fontSize: 18,
  },
});
