import React from "react";
import { StyleSheet, Text, View, TextInput, StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  gripUpdate,
  gyroUpdate,
  secondStepLetterInc,
  secondStepLetterDec,
  setSecondLetter,
  updateInputSentence,
  updateFeedbackMessage,
  updatePhoneNumber
} from "../actions";
import LetterPicker from "./LetterPicker";
import goStyles from "./Styles/goStyles";
import D from "./Styles/dimensions";
var Myo = require("myo");

Myo.onError = function() {
  console.log("Woah, couldn't connect to Myo Connect");
};

var myMyo;
var MyoMessage;
var letterCount = 0;
var stepCounter = 0;

class ContactPage extends React.Component {
  state = {
    letterBoxes: ["A-H", "I-O", "P-Z", "0-9"],
    text: ""
  };

  addStepCounter() {
    stepCounter++;
    if (letterCount === 1) {
      this.props.updateFeedbackMessage("Library I-O");
    } else if (letterCount === 2) {
      this.props.updateFeedbackMessage("Library P-Z");
    } else if (letterCount === 0) {
      this.props.updateFeedbackMessage("Library A-H");
    } else if (letterCount === 3) {
      this.props.updateFeedbackMessage("Library 0-9");
    }
    if (stepCounter === 2) {
      this.props.updateFeedbackMessage("Letter " + this.props.secondStepLetter);
    }
  }

  reduceStepCounter() {
    if (stepCounter > 0) {
      stepCounter--;
    }
    if (letterCount === 1) {
      this.props.updateFeedbackMessage("Library I-O");
    } else if (letterCount === 2) {
      this.props.updateFeedbackMessage("Library P-Z");
    } else if (letterCount === 0) {
      this.props.updateFeedbackMessage("Library A-H");
    } else if (letterCount === 3) {
      this.props.updateFeedbackMessage("Library 0-9");
    }
  }

  addLetterCount() {
    if (stepCounter === 1) {
      this.props.secondStepLetterInc(letterCount, this.props.secondStepLetter);

      this.props.updateFeedbackMessage("Number " + this.props.secondStepLetter);
    } else {
      this.props.updateFeedbackMessage("Backspaced");
      var sentence = this.props.phoneNumber.slice(0, -1);
      this.props.updatePhoneNumber(sentence);
    }
  }

  reduceLetterCount() {
    if (stepCounter === 1) {
      this.props.secondStepLetterDec(letterCount, this.props.secondStepLetter);

      this.props.updateFeedbackMessage("Number " + this.props.secondStepLetter);
    } else {
      this.props.updateFeedbackMessage("Spaced");
      this.props.updatePhoneNumber(this.props.phoneNumber + " ");
    }
  }

  getGyroData() {
    if (this.props.gyroData) {
      return this.props.gyroData.x;
    } else {
      return this.props.handGrip;
    }
  }

  changeGrip(grip) {
    this.props.gripUpdate(grip);
  }

  stepWatcher() {
    if (stepCounter === 0) {
      return (
        <View style={styles.libraryContainerStyle}>
          <Text style={styles.titleTextBody}>Directory</Text>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text style={styles.titleTextBody}>Feedback</Text>
          <Text style={styles.textBody}>{this.props.feedbackMessage}</Text>
        </View>
      );
    } else if (stepCounter === 1) {
      return (
        <View style={styles.libraryContainerStyle}>
          <Text style={styles.titleTextBody}>Directory</Text>
          <Text style={styles.textBody}>
            {this.state.letterBoxes[letterCount]}
          </Text>
          <Text />
          <Text />
          <Text />
          <Text style={styles.titleTextBody}>Feedback</Text>
          <Text style={styles.textBody}>{this.props.feedbackMessage}</Text>
        </View>
      );
    } else if (stepCounter === 2) {
      return (
        <View style={styles.libraryContainerStyle}>
          <Text style={styles.titleTextBody}>Directory</Text>
          <Text style={styles.textBody}>
            {this.state.letterBoxes[letterCount]}
          </Text>

          <Text style={styles.textBody}>{this.props.secondStepLetter}</Text>

          <Text />
          <Text />
          <Text style={styles.titleTextBody}>Feedback</Text>
          <Text style={styles.textBody}>{this.props.feedbackMessage}</Text>
        </View>
      );
    } else if (stepCounter === 3) {
      stepCounter = 0;
      this.props.updatePhoneNumber(
        this.props.phoneNumber + this.props.secondStepLetter
      );
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainerStyle}>
          <Text allowFontScaling={false} style={styles.logo}>
            mov
            <Text allowFontScaling={false} style={styles.logoBold}>
              Text
            </Text>
          </Text>
        </View>
        <View style={styles.loginFormStyle}>
          <View style={styles.innerContainerStyle}>
            <View>{this.stepWatcher()}</View>
            <TextInput
              style={styles.inputStyle}
              value={this.props.phoneNumber}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: goStyles.background
  },
  inputStyle: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.24)",
    borderRadius: 5,
    paddingHorizontal: 20,
    color: "white",
    marginBottom: 20
  },
  innerContainerStyle: {
    marginLeft: 20,
    marginRight: 20
  },
  logoContainerStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  },
  libraryContainerStyle: {
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.24)",
    marginBottom: 20,
    marginTop: 140,
    width: D.width * 9 / 10,
    height: D.height * 2.5 / 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  loginFormStyle: {
    justifyContent: "center",
    flex: 4
  },
  logo: {
    fontSize: 48,
    color: "white",
    fontWeight: "300"
  },
  textBody: {
    fontSize: 16,
    color: "white",
    fontWeight: "400"
  },
  titleTextBody: {
    fontSize: 18,
    color: "white",
    fontWeight: "600"
  },
  logoBold: {
    fontWeight: "800",
    color: goStyles.primary
  },
  modalButton: {
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 80
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: "center"
  }
};

const mapStateToProps = ({ myo }) => {
  const {
    handGrip,
    gyroData,
    secondStepLetter,
    inputSentence,
    feedbackMessage,
    phoneNumber
  } = myo;

  return {
    handGrip,
    gyroData,
    secondStepLetter,
    inputSentence,
    feedbackMessage,
    phoneNumber
  };
};

export default connect(mapStateToProps, {
  gripUpdate,
  gyroUpdate,
  secondStepLetterDec,
  secondStepLetterInc,
  setSecondLetter,
  updateInputSentence,
  updateFeedbackMessage,
  updatePhoneNumber
})(ContactPage);
