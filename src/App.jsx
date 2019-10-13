import React from "react";
import { hot } from "react-hot-loader";
import { QueryParamProvider } from "use-query-params";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

import "./styles.scss";

import Tutorial from "./Tutorial";
import CheatSheet from "./CheatSheet";

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <nav>
          <ul>
            <li>
              <NavLink to="/tutorial">
                Animated tutorial of example query
              </NavLink>
            </li>
            <li>
              <NavLink to="/cheatsheet">Reference cheat sheet</NavLink>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Switch>
            <Route path="/cheatsheet" component={CheatSheet} />
            <Route path="/tutorial" component={Tutorial} />
            <Redirect to="/tutorial" />
          </Switch>
        </div>
      </QueryParamProvider>
    </Router>
  );
}

export default hot(module)(App);
