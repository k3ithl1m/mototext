import React, { Component } from "react";
import { View, Text } from "react-native";

class LetterPicker extends Component {
  state = {
    letterBoxes: ["A-H", "I-O", "P-Z"]
  };

  render() {
    return (
      <View>
        <Text> Hey </Text>
      </View>
    );
  }
}

export default LetterPicker;
