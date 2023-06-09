import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../config/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem("userAccessToken");
      const refreshToken = await AsyncStorage.getItem("userRefreshToken");

      if (!accessToken || !refreshToken) {
        navigation.navigate("/");
      } else {
        navigation.navigate("Home");
      }
    };

    checkToken();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
          height: "100%",
        },
      ]}
    >
      <Image source={require("../assets/odnIcon.png")} />

      <Pressable
        onPress={() => navigation.navigate("KakaoLogin")}
        style={{ alignItems: "center", width: "100%" }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FEE500",
            height: 50,
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Image
            source={require("../assets/kakaoIcon.png")}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
          <Text style={{ paddingLeft: 5, fontWeight: "bold" }}>
            카카오 로그인
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Login;
