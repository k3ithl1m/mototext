import {
  GRIP_CHANGED,
  GYRO_UPDATE,
  STEP_LETTER,
  UPDATE_INPUT_SENTENCE,
  UPDATE_FEEDBACK_MESSAGE,
  UPDATE_PHONE_NUMBER
} from "../actions/types";

const INITIAL_STATE = {
  handGrip: "",
  gyroData: null,
  secondStepLetter: "A",
  inputSentence: "",
  feedbackMessage: "Welcome",
  phoneNumber: "123"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRIP_CHANGED:
      return { ...state, handGrip: action.payload };
    case GYRO_UPDATE:
      return { ...state, gyroData: action.payload };
    case STEP_LETTER:
      return { ...state, secondStepLetter: action.payload };
    case UPDATE_INPUT_SENTENCE:
      return { ...state, inputSentence: action.payload };
    case UPDATE_FEEDBACK_MESSAGE:
      return { ...state, feedbackMessage: action.payload };
    case UPDATE_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    default:
      return state;
  }
};
