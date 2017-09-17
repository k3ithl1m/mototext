//reducer has to be function
import { combineReducers } from "redux";
import MyoReducer from "./MyoReducer";

export default combineReducers({
  myo: MyoReducer
});
