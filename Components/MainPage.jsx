import { Tab, TabView } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Search from "./Search";
import Sets from "./Sets";
import { useState } from "react";

export default function MainPage() {
  const [index, setIndex] = useState(0);

  const tabsContent = [
    { id: 0, title: "User", iconName: "people-circle", component: null },
    { id: 1, title: "Sets", iconName: "cart", component: Sets },
    { id: 2, title: "Search", iconName: "search", component: Search },
  ];

  return (
    <>
      <Tab
        style={{ paddingVertical: 15, paddingTop: 50 }}
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        {tabsContent.map((tab) => (
          <Tab.Item
            key={tab.id}
            title={tab.title}
            titleStyle={{ fontSize: 12 }}
            icon={{ name: tab.iconName, type: "ionicon", color: "white" }}
          />
        ))}
      </Tab>

      <TabView
        value={index}
        style={mainPageStyles.container}
        onChange={setIndex}
        animationType="spring"
      >
        {tabsContent.map((tab) => (
          <LinearGradient
            key={tab.title}
            colors={["#e4e5e6", "#dbdbdb"]}
            style={mainPageStyles.container}
          >
            <TabView.Item>
              {index === tab.id && tab.component && <tab.component />}
            </TabView.Item>
          </LinearGradient>
        ))}
      </TabView>
    </>
  );
}

const mainPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  item: {},
});
