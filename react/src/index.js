import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios'

import "antd/dist/antd.css";
import './index.css';

import * as serviceWorker from './serviceWorker';

import AppLayout from "./layouts/App/App";
import AuthLayout from "./layouts/Auth/Auth";

axios.defaults.baseURL = "https://asia-east2-cs2006-bookator.cloudfunctions.net/api"

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/app"
        render={props => {
          return <AppLayout {...props} />;
        }}
      />
      <Route
        path="/auth"
        render={props => {
          return <AuthLayout {...props} />;
        }}
      />
      <Redirect to="/auth" />
    </Switch>
  </Router>,
document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
