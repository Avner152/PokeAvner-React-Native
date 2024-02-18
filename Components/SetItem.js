import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import myStore from "../MobX/Store";

const SetItem = ({ set }) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    myStore.updateCardsInSet([]);
    myStore.updateSet(set);
    navigation.navigate("Set");
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            overflow: "hidden",
            textAlign: "center",
            width: 100,
            marginVertical: "auto",
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            h2
            style={{ textAlign: "center" }}
          >
            {set.name}
          </Text>
        </View>
        <View style={styles.image}>
          <Image
            resizeMode="contain"
            style={{
              flex: 1,
            }}
            source={{ uri: set.images.logo }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 50,
    // borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 15,
  },
});

export default SetItem;
