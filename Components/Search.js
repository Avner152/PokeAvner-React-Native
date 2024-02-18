import { Button, Image, SearchBar } from "@rneui/themed";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import pokemon from "pokemontcgsdk";
import myStore from "../MobX/Store";
import Set from "./Set";

export default function Search() {
  pokemon.configure({ apiKey: "726a711a-7e33-48af-b379-225f67d6b589" });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [failMessage, setFailMessage] = useState("");

  useEffect(() => {
    myStore.updateCardsInSet([]);
  }, []);

  const fetchPokemon = () => {
    Keyboard.dismiss();
    setLoading(true);
    pokemon.card.all({ q: `name:${search}` }).then((cards) => {
      myStore.updateCardsInSet(cards);
      setLoading(false);

      console.log("cards >");
      console.log(cards);

      if (cards.length) setFailMessage("");
      else setFailMessage(`${search} wasn't found. try again`);
    });
  };

  return (
    <View style={styles.view}>
      <SearchBar
        lightTheme
        placeholder="Type Here..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Button onPress={fetchPokemon} title="search" />

      {loading === true ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {failMessage && (
            <Text style={{ textAlign: "center", marginTop: 15 }}>
              {failMessage}
            </Text>
          )}
          <View style={styles.row}>
            <Set cameFromSearch={true} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    paddingTop: 20,
    paddingBottom: 450,
  },
  image: {
    width: 140,
    height: 220,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
