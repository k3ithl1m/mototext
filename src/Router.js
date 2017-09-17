import React, { Component } from "react";
import { Router, Scene, Actions } from "react-native-router-flux";
import MyoChat from "./component/MyoChat";
import ContactPage from "./component/ContactPage";

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene>
          <Scene hideNavBar key="message" component={MyoChat} />
        </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
