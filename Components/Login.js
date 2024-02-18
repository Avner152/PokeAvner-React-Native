import { Button, Image, Input } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = () => {
    console.log(`username>> ${username}`);
    console.log(`password>> ${password}`);
  };

  return (
    <LinearGradient
      colors={["#26a0da", "#314755"]}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Image
            style={{
              width: 130,
              maxWidth: "100%",
              height: 200,
            }}
            source={{
              uri: "https://res.cloudinary.com/dgtgbyo76/image/upload/v1699123373/tmj6mkodjqbxlc6d3qfi.png",
            }}
          />
          <Text
            style={{
              fontSize: 55,
              maxWidth: "49%",
              textAlign: "center",
              letterSpacing: 2,
              marginBottom: 20,
              fontFamily: "Oswald",
            }}
          >
            Login
          </Text>
        </View>

        <View style={{ width: 270 }}>
          <TextInput
            value={username}
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Button onPress={loginHandler} title={"Submit"} />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
