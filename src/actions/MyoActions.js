import {
  GRIP_CHANGED,
  GYRO_UPDATE,
  STEP_LETTER,
  UPDATE_INPUT_SENTENCE,
  UPDATE_FEEDBACK_MESSAGE,
  UPDATE_PHONE_NUMBER
} from "./types";

var charAtNum = "";
var numAtChar;

export const gripUpdate = grip => {
  console.log(grip);
  return {
    type: GRIP_CHANGED,
    payload: grip
  };
};

var newData = {
  roll_w: "",
  pitch_w: "",
  yaw_w: ""
};

export const gyroUpdate = data => {
  return {
    type: GYRO_UPDATE,
    payload: data
  };
};

export const setSecondLetter = letterCount => {
  if (letterCount === 0) {
    charAtNum = "A";
  } else if (letterCount === 1) {
    charAtNum = "I";
  } else if (letterCount === 2) {
    charAtNum = "P";
  } else {
    charAtNum = "0";
  }

  return {
    type: STEP_LETTER,
    payload: charAtNum
  };
};

export const secondStepLetterInc = (letterCount, secondStepLetter) => {
  numAtChar = secondStepLetter.charCodeAt(0);
  if (letterCount === 0) {
    if (numAtChar === 72) {
      numAtChar = 65;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar++;
      charAtNum = String.fromCharCode(numAtChar);
    }
  } else if (letterCount === 1) {
    if (numAtChar === 79) {
      numAtChar = 73;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar++;
      charAtNum = String.fromCharCode(numAtChar);
    }
  } else if (letterCount === 2) {
    if (numAtChar === 90) {
      numAtChar = 80;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar++;
      charAtNum = String.fromCharCode(numAtChar);
    }
  } else if (letterCount === 3) {
    if (numAtChar === 57) {
      numAtChar = 48;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar++;
      charAtNum = String.fromCharCode(numAtChar);
    }
  }
  return {
    type: STEP_LETTER,
    payload: charAtNum
  };
};

export const secondStepLetterDec = (letterCount, secondStepLetter) => {
  numAtChar = secondStepLetter.charCodeAt(0);
  if (letterCount === 0) {
    if (numAtChar === 65) {
      numAtChar = 72;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar--;
      charAtNum = String.fromCharCode(numAtChar);
    }
  } else if (letterCount === 1) {
    if (numAtChar === 73) {
      numAtChar = 79;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar--;
      charAtNum = String.fromCharCode(numAtChar);
    }
  } else if (letterCount === 2) {
    if (numAtChar === 80) {
      numAtChar = 90;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar--;
      charAtNum = String.fromCharCode(numAtChar);
    }
  } else if (letterCount === 3) {
    if (numAtChar === 48) {
      numAtChar = 57;
      charAtNum = String.fromCharCode(numAtChar);
    } else {
      numAtChar--;
      charAtNum = String.fromCharCode(numAtChar);
    }
  }
  return {
    type: STEP_LETTER,
    payload: charAtNum
  };
};

export const updatePhoneNumber = text => {
  return {
    type: UPDATE_PHONE_NUMBER,
    payload: text
  };
};

export const updateInputSentence = text => {
  return {
    type: UPDATE_INPUT_SENTENCE,
    payload: text
  };
};

export const updateFeedbackMessage = feedback => {
  return {
    type: UPDATE_FEEDBACK_MESSAGE,
    payload: feedback
  };
};
