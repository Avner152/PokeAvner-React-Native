import { useEffect, useRef, useState } from "react";
import myStore from "../MobX/Store";
import {
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react";

import pokemon from "pokemontcgsdk";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
pokemon.configure({ apiKey: "726a711a-7e33-48af-b379-225f67d6b589" });

const Set = observer(({ cameFromSearch }) => {
  const styles = StyleSheet.create({
    animatedView: {
      width: 60,
      height: 40,
      marginBottom: 35,
      marginTop: 35,
      transformOrigin: "center",
      width: "100%",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
      paddingBottom: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
    },
    modalView: {
      margin: 0,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 0,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      padding: 10,
    },
    modalText: {
      marginBottom: 0,
      textAlign: "center",
    },
    parametersRow: {
      fontWeight: 600,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
  });
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cardOnModal, setCardOnModal] = useState(null);
  const [cardsInSet, setCardsInSet] = useState([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [condition, setCondition] = useState(0);
  const conditions = [
    { text: "Excellent", code: "high" },
    { text: "Used", code: "mid" },
    { text: "Poor", code: "low" },
  ];

  const scaleValue = useRef(new Animated.Value(1)).current;
  const breathingAnimation = useRef(
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 1500,
        useNativeDriver: true,
      }),
    ])
  ).current;

  useEffect(() => {
    Animated.loop(breathingAnimation).start();
  }, [scaleValue]);

  useEffect(() => {
    navigation.setOptions({ title: myStore.set.name });
    if (cameFromSearch) {
      breathingAnimation.stop();
    } else {
      // console.log(`searching ${Math.random(1) * 100}`);
      pokemon.card
        .all({ q: `id:${myStore.set.id}` })
        .then((set) => {
          myStore.updateCardsInSet(
            set.sort((a, b) => parseInt(a.number) - parseInt(b.number))
          );
          // console.log(myStore.cardsInSet[0].set.name);

          breathingAnimation.stop();
        })
        .catch((err) => console.log(err));
    }
    setCardsInSet(myStore.cardsInSet);
  }, []);

  const imageClickedHandler = (card) => {
    setModalVisible(!modalVisible);
    setCardOnModal(card);
    console.log(card.name);
  };

  const fixCamelCase = (text) => {
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(" Holofoil", "");
  };

  return (
    <ScrollView>
      {!cameFromSearch && (
        <Animated.View
          style={[styles.animatedView, { transform: [{ scale: scaleValue }] }]}
        >
          <Image
            resizeMode="contain"
            style={{
              flex: 1,
            }}
            source={{ uri: myStore.set.images.symbol }}
          />
        </Animated.View>
      )}
      <View style={styles.row}>
        {myStore.cardsInSet.map((card, k) => (
          <View
            key={k}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                overflow: "hidden",
                width: 120,
              }}
            >
              <Text
                style={{ textAlign: "center" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {card.name}
              </Text>
              <Text style={{ fontSize: 10, textAlign: "center" }}>
                {card.number}/{card.set.total}
              </Text>
            </View>
            <Pressable onPress={() => imageClickedHandler(card)}>
              <View
                style={{
                  width: 120,
                  height: 190,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    flex: 1,
                    borderRadius: 20,
                  }}
                  source={{ uri: card.images.small }}
                />
              </View>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {cardOnModal && (
                <ScrollView style={{ maxHeight: 650 }}>
                  <Text h1>{cardOnModal.name}</Text>

                  <View
                    style={{
                      width: 250,
                      height: 360,
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        flex: 1,
                        borderRadius: 25,
                      }}
                      source={{ uri: cardOnModal.images.small }}
                    />
                  </View>

                  <Text style={{ textAlign: "center" }}>Prices:</Text>
                  <View style={styles.parametersRow}>
                    <Text>Edition:</Text>
                    {Object.keys(cardOnModal.tcgplayer.prices).map((key, k) => (
                      <View
                        key={k}
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <Text>{fixCamelCase(key)}</Text>
                        <CheckBox
                          checked={priceIndex === k}
                          onPress={() => setPriceIndex(k)}
                          checkedIcon="check-circle"
                          uncheckedIcon="circle-o"
                        />
                      </View>
                    ))}
                  </View>

                  <View style={styles.parametersRow}>
                    <Text>Condition:</Text>
                    {conditions.map((cond, i) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text>{cond.text}</Text>
                        <CheckBox
                          checked={condition === i}
                          onPress={() => setCondition(i)}
                          checkedIcon="check-circle"
                          uncheckedIcon="circle-o"
                        />
                      </View>
                    ))}
                  </View>
                  <Text
                    style={{
                      marginVertical: 15,
                      textAlign: "center",
                      fontSize: 20,
                      color: "crimson",
                    }}
                  >{`${
                    cardOnModal
                      ? cardOnModal.tcgplayer.prices[
                          Object.keys(cardOnModal.tcgplayer.prices)[priceIndex]
                        ][conditions[condition].code]
                      : ""
                  }$`}</Text>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
});

export default Set;
