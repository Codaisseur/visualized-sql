import React from "react";
import { hot } from "react-hot-loader";
import { QueryParamProvider } from "use-query-params";
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";

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
              <NavLink exact to="/">
                Animated tutorial of example query
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/cheatsheet">
                Reference cheat sheet
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Switch>
            <Route path="/cheatsheet" component={CheatSheet} />
            <Route component={Tutorial} />
          </Switch>
        </div>
      </QueryParamProvider>
    </Router>
  );
}

export default hot(module)(App);
