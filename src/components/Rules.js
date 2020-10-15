import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  ScrollView
} from "react-native";

/**
 * Rules
 * Rules component is a button that handles a modal slide up that displays all game rules.
 */
function Rules() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                  <Text style={styles.rulesTitle}>OBJECTIVE</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    Each player attempts to group their cards together to
                    satisfy the rounds melding requirements in order to have the
                    lowest total card value at the end each round and ultimately
                    the game.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>NUMBER OF DECKS</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>2</Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>NUMBER OF PLAYERS</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>3 or 6</Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>NUMBER OF ROUNDS</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>6</Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>RANK OF CARDS</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    K , Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2 (WILD CARD), A
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>VALUE OF CARDS</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    K (10), Q (10), J (10), 10 (10), 9 (9), 8 (8), 7 (7), 6 (6),
                    5 (5), 4 (4), 3 (3), 2 (20), A (1)
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>MELD</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    A meld is a group or set of cards that all have the same
                    value. Each round has a unique meld requirement that needs
                    to be met. For example, round one has the meld requirement
                    of - 2 THREE OF A KIND - which means two sets of three cards
                    that all have the same value. A wildcard (2) can be used in
                    the place of any card.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>MELDS</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    1 - 2 Three of a Kind{"\n"}2 - 1 Four of a Kind{"\n"}3 - 2
                    Four of a Kind{"\n"}4 - 1 Five of a Kind{"\n"}5 - 1 Six of a
                    Kind{"\n"}6 - 2 Five of a Kind
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>THE DEAL</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    Each player gets 11 cards faced down. The top card in the
                    remaining cards is flipped to begin the discard pile. The
                    remaining cards along with the discard pile are placed side
                    by side in the middle of the board.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>BUYING</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    Each player begins the game with 6 buys. At the start of
                    every turn each player will have the opportunity to buy the
                    most recently discarded card. If multiple players request to
                    buy a card the buyer is determined in order from active
                    player onwards in a clockwise motion. The player who
                    discarded the card cannot purchase the card. Upon a
                    successful purchase a player also draws an extra card from
                    the deck. A player may buy up to six times throughout the
                    entire game.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>MELDING</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    A player may meld when they have the correct combination of
                    cards in their hand to satisfy the rounds meld. The player
                    may place their cards in the center melding area of the
                    board in order to meld.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>THE PLAY</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    In the beginning of each round players will have
                    approximately 15 seconds to request to buy the top most card
                    in the discard pile. Following the buying process the active
                    player will be dealt a card from the deck and have
                    approximately 60 seconds to complete their turn. The player
                    may lay down a meld or add cards to existing melds as long
                    as they themselves have already met the rounds meld
                    requirements. Each turn ends with a player discarding a card
                    into the discard pile. Therefor any meld action must result
                    with the player having at least one card in their hand in
                    order to discard. The round finishes when a player discards
                    their last card.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>LAYING OFF</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    In addition to the round meld - a player may meld any set of
                    three or more cards of the same rank as well as any straight
                    of three or more cards with the same suit - so long as the
                    player has already met their round meld requirements.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>SWAPPING & DROPPING</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    If a player has a card that can replace a wildcard in an
                    active meld, while still maintaining the validity of that
                    meld, a player may swap their card for the wild card. The
                    player cannot swap on a meld created by them. A player may
                    also drop a card to any meld including their own that, when
                    dropped, maintains the validity of that meld. A player must
                    meet their meld requirements before swapping or dropping.
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={styles.rulesTitle}>SCORING</Text>
                  {"\n"}
                  <Text style={styles.rulesDescription}>
                    At the end of every round the player who has no cards left
                    in their hand wins. The remaining cards in each players hand
                    are counted by value and added to their total. The objective
                    is to have the least amount of points. The player with the
                    least points after six rounds wins.
                  </Text>
                </Text>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPressIn={() => setModalVisible(false)}
        onPressOut={() => setModalVisible(true)}
      >
        <Text style={styles.textColor}>RULES</Text>
      </TouchableHighlight>
    </View>
  );
}

/** Styling for Rules Component */
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20
  },
  text: {
    fontSize: 16
  },
  rightView: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    width: 100,
    alignSelf: "flex-start",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.81
  },
  textColor: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily: "HelveticaNeue-CondensedBold",
    fontSize: 18
  },
  modalText: {
    textAlign: "center"
  },
  rulesTitle: {
    fontWeight: "900",
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1
  },
  rulesDescription: {
    flexDirection: "row",
    alignSelf: "flex-start",
    flex: 1,
    marginBottom: 8
  }
});

export default Rules;
