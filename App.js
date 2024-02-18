import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Components/HomeScreen";
import Login from "./Components/Login";
import Set from "./Components/Set";
import { useFonts } from "expo-font";

import MainPage from "./Components/MainPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  let [loadedFonts] = useFonts({
    Oswald: require("./assets/fonts/Oswald-Bold.ttf"),
    Merienda: require("./assets/fonts/Merienda-Bold.ttf"),
  });

  return (
    <>
      {/* <MyHeader /> */}
      {loadedFonts && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Set"
              component={Set}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
