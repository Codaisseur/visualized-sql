import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";

import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import Tutorial from "./Tutorial";
import SqlStepper from "./SqlStepper";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              Animated tutorial (sketch)
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/stepper">
              Stepper (WIP)
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/stepper" component={SqlStepper} />
          <Route component={Tutorial} />
        </Switch>
      </div>
    </Router>
  );
}

export default hot(module)(App);
