import { Button, Image } from "@rneui/themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/charizard")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <LinearGradient
      colors={["#26a0da", "#314755"]}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={homePageStyles.flexed}>
        {data && (
          <Image
            containerStyle={homePageStyles.images}
            source={{ uri: data.sprites.front_default }}
          />
        )}
        <Text>tm</Text>
      </View>
      <Text style={{ color: "#fff" }}>This is Avner's App</Text>

      <Button
        title={"Main Page!"}
        containerStyle={homePageStyles.button}
        onPress={() => navigation.navigate("Main")}
      />
      <Button
        title={"Log In!"}
        containerStyle={homePageStyles.button}
        onPress={() => navigation.navigate("Login")}
      />
    </LinearGradient>
  );
}

const homePageStyles = StyleSheet.create({
  flexed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
    borderRadius: 50,
  },
  images: {
    width: 200,
    height: 200,
  },
});
