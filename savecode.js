import React, { Component } from "react";
import Main from "./src/Main";

export default class App extends Component {
  render() {
    return <Main />;
  }
}

console.disableYellowBox = true;


import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
var Myo = require("myo");

Myo.onError = function() {
  console.log("Woah, couldn't connec to Myo Connect");
};

var myMyo;
var MyoMessage;

Myo.on("connected", function() {
  myMyo = this;
  addEvents(myMyo);
});

var addEvents = function(myo) {
  myo.on("fist", function() {
    console.log("fist for ", this.macAddress);
    MyoMessage = "hello";
  });
};

export default class App extends React.Component {
  render() {
    Myo.on("fist", function() {
      console.log("Fist!");
      this.vibrate();
    });
    Myo.connect();
    return (
      <View style={styles.container}>
        <Text>Record grip</Text>
        <TextInput
          style={{ height: 40, width: 80, borderColor: "gray", borderWidth: 1 }}
          value={MyoMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
