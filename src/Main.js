import React, { Component } from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import Router from "./Router";
//import logger from "redux-logger";

class Main extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    //get the time value when the app starts with this
    // call back
    return (
      <Provider store={store}>
        <Router />
        {/* <Profile /> */}
      </Provider>
    );
  }
}

export default Main;
