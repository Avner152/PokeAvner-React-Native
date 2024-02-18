import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import pokemon from "pokemontcgsdk";
import { useEffect, useState } from "react";
import SetItem from "./SetItem";
import myStore from "../MobX/Store";
import { observer } from "mobx-react";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Button } from "@rneui/themed";

const Sets = observer(() => {
  const gradients = [
    "#83a4d4, #b6fbff",
    "#ffb347, #ffcc33",
    "#e53935, #e35d5b",
    "#00c9ff, #92fe9d",
    "#76b852, #8dc26f",
    "#fd746c, #ff9068",
    "#dbe6f6, #c5796d",
    "#b2fefa, #0ed2f7",
    "#83a4d4, #b6fbff",
    "#ffb347, #ffcc33",
    "#e53935, #e35d5b",
    "#00c9ff, #92fe9d",
    "#76b852, #8dc26f",
    "#fd746c, #ff9068",
    "#dbe6f6, #c5796d",
    "#b2fefa, #0ed2f7",
  ];

  const [pressed, setPressed] = useState(false);

  const fetchSetsFromSeries = (setId) => {
    console.log(`${setId} pressed`);
    pokemon.set
      .all({ q: `series:${setId}` })
      .then((res) => {
        console.log(res);
        myStore.updateSets(res.sort(sortByDate));
        setPressed(true);
      })
      .catch((err) => console.log(err));
    // console.log(setId);
  };

  const styles = StyleSheet.create({
    row: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
      paddingTop: 20,
      paddingBottom: 20,
    },
  });
  const [loading, setLoading] = useState(false);

  const sortByDate = (a, b) => {
    const [yearA, monthA, dayA] = a.releaseDate.split("/");
    const [yearB, monthB, dayB] = b.releaseDate.split("/");
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return new Date(dateA) - new Date(dateB);
  };

  pokemon.configure({ apiKey: "726a711a-7e33-48af-b379-225f67d6b589" });

  useEffect(() => {
    if (!myStore.sets.length) {
      setLoading(true);
      pokemon.set.all({}).then((sets) => {
        // setSets();
        const reduceSeries = sets.sort(sortByDate).reduce((acc, set) => {
          if (set.series.includes("&")) console.log(set);
          if (!acc.includes(set.series)) acc.push(set.series);
          return acc;
        }, []);

        myStore.updateSeries(reduceSeries);

        setLoading(false);
      });
    }
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {pressed && myStore.sets.length > 0 ? (
            <View>
              <Button
                onPress={() => {
                  setPressed(false);
                  myStore.updateSets([]);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon name="arrow-back" color="white" />
                back
              </Button>
              <View style={styles.row}>
                {myStore.sets.map((set) => (
                  <SetItem set={set} />
                ))}
              </View>
            </View>
          ) : (
            <View style={{ display: "flex", flexDirection: "column" }}>
              {myStore.series.map((s, k) => (
                <Pressable
                  key={k}
                  onPress={() => fetchSetsFromSeries(s.replaceAll(" ", ""))}
                >
                  <LinearGradient
                    style={{
                      padding: 45,
                      marginVertical: 10,
                      borderRadius: 10,
                    }}
                    colors={gradients[k].split(", ")}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: 600,
                        fontFamily: "Merienda",
                        letterSpacing: -2,
                        color: "#fff",
                      }}
                    >
                      {s}
                    </Text>
                  </LinearGradient>
                </Pressable>
                // <SetItem key={k} set={set} />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
});

export default Sets;
