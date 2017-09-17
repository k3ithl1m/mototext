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
  updateFeedbackMessage
} from "../actions";
import { Actions } from "react-native-router-flux";
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

function setOrigin() {
  Myo.zeroOrientation();
}

class MyoChat extends React.Component {
  state = {
    letterBoxes: ["A-H", "I-O", "P-Z", "0-9"],
    text: ""
  };

  componentWillMount() {
    Myo.on("fist", () => {
      console.log("Fist!");
      this.changeGrip("fist");
      this.addStepCounter();
    });

    Myo.on("fist", function() {
      this.vibrate();
      this.zeroOrientation();
    });

    Myo.on("lock", function() {
      this.vibrate();
      this.vibrate();
    });

    Myo.on("double_tap", () => {});

    Myo.on("fist_off", () => {
      console.log("Fist done");
      this.props.gyroUpdate(null);
      this.changeGrip("");
    });

    Myo.on("wave_in", () => {
      console.log("Wave In!");
      this.changeGrip("Wave In");
      this.addLetterCount();
    });

    Myo.on("wave_in_off", () => {
      console.log("Wave In!");
      this.changeGrip("");
    });

    Myo.on("wave_out", () => {
      console.log("Wave Out!");
      this.changeGrip("Wave Out");
      this.reduceLetterCount();
    });

    Myo.on("wave_out_off", () => {
      console.log("Wave In!");
      this.changeGrip("");
    });

    Myo.on("fingers_spread", () => {
      console.log("Spread!");
      this.changeGrip("Spread");
      if (stepCounter !== 0) {
        this.reduceStepCounter();
      } else {
        Actions.pop();
      }
    });

    Myo.on("fingers_spread_off", () => {
      console.log("Spread done");
      this.changeGrip("");
    });

    Myo.on("gyroscope", data => {
      if (this.props.handGrip === "fist") {
        this.props.gyroUpdate(data);
      }
    });

    Myo.connect();
  }

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
      if (letterCount === 3) {
        this.props.updateFeedbackMessage(
          "Number " + this.props.secondStepLetter
        );
      } else {
        this.props.updateFeedbackMessage(
          "Letter " + this.props.secondStepLetter
        );
      }
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
      if (letterCount === 3) {
        letterCount = 0;
      } else {
        letterCount++;
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

      this.props.setSecondLetter(letterCount);
    } else if (stepCounter === 2) {
      this.props.secondStepLetterInc(letterCount, this.props.secondStepLetter);

      if (letterCount === 3) {
        this.props.updateFeedbackMessage(
          "Number " + this.props.secondStepLetter
        );
      } else {
        this.props.updateFeedbackMessage(
          "Letter " + this.props.secondStepLetter
        );
      }
    } else {
      this.props.updateFeedbackMessage("Backspaced");
      var sentence = this.props.inputSentence.slice(0, -1);
      this.props.updateInputSentence(sentence);
    }
  }

  reduceLetterCount() {
    if (stepCounter === 1) {
      if (letterCount === 0) {
        letterCount = 3;
      } else {
        letterCount--;
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

      this.props.setSecondLetter(letterCount);
    } else if (stepCounter === 2) {
      this.props.secondStepLetterDec(letterCount, this.props.secondStepLetter);
      if (letterCount === 3) {
        this.props.updateFeedbackMessage(
          "Number " + this.props.secondStepLetter
        );
      } else {
        this.props.updateFeedbackMessage(
          "Letter " + this.props.secondStepLetter
        );
      }
    } else {
      this.props.updateFeedbackMessage("Spaced");
      this.props.updateInputSentence(this.props.inputSentence + " ");
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
      if (this.props.inputSentence !== "") {
        this.props.updateInputSentence(
          this.props.inputSentence + this.props.secondStepLetter.toLowerCase()
        );
      } else {
        this.props.updateInputSentence(
          this.props.inputSentence + this.props.secondStepLetter
        );
      }
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainerStyle}>
          <Text allowFontScaling={false} style={styles.logo}>
            moto
            <Text allowFontScaling={false} style={styles.logoBold}>
              Text
            </Text>
          </Text>
        </View>
        <View style={styles.loginFormStyle}>
          <View style={styles.innerContainerStyle}>
            <View>{this.stepWatcher()}</View>
            <TextInput
              style={goStyles.inputStyle}
              value={this.props.inputSentence}
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
    fontWeight: "400"
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
    feedbackMessage
  } = myo;

  return {
    handGrip,
    gyroData,
    secondStepLetter,
    inputSentence,
    feedbackMessage
  };
};

export default connect(mapStateToProps, {
  gripUpdate,
  gyroUpdate,
  secondStepLetterDec,
  secondStepLetterInc,
  setSecondLetter,
  updateInputSentence,
  updateFeedbackMessage
})(MyoChat);
