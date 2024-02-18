import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import logo from "../assets/logo.png";
import { ListItem } from "@rneui/themed";
import { useState } from "react";
export default function MyHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuOpacity] = useState(new Animated.Value(0));

  const items = [
    { name: "Home", icon: "" },
    { name: "Find Cards", icon: "" },
    { name: "Login", icon: "" },
    { name: "Register", icon: "" },
    { name: "Contact us", icon: "" },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);

    Animated.timing(menuOpacity, {
      toValue: showMenu ? 0 : 1,
      duration: 1300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View style={headerStyles.top}>
        <TouchableOpacity
          onPress={toggleMenu}
          headerStyles={headerStyles.menuButton}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              elevation: 4, // for shadow on Android
              shadowColor: "#000", // for shadow on iOS
              shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Image source={logo} style={{ width: 50, height: 50 }} />

            <View>
              {Array.from({ length: 3 }).map((k) => (
                <View style={headerStyles.hamburger} />
              ))}
            </View>
          </View>
        </TouchableOpacity>

        <Text>levy</Text>
      </View>

      {showMenu && (
        <Animated.View
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            zIndex: 10,
            height: 200,
          }}
        >
          {items.map((item, k) => (
            <ListItem key={k}>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Animated.View>
      )}
    </>
  );
}
const headerStyles = StyleSheet.create({
  hamburger: {
    backgroundColor: "#000",
    width: 15,
    height: 3,
    marginVertical: 2,
  },
  menu: {},

  top: {
    backgroundColor: "#26a0da",
    paddingTop: 50,
    height: 80,
    flexDirection: "row",
    paddingHorizontal: 100,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 10,
  },
});
