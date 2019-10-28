import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios'

import "antd/dist/antd.css";
import './index.css';

import * as serviceWorker from './serviceWorker';

import Hub from "./layouts/User/Hub/Hub";
import Login from "./layouts/User/Login/Login";

import Collections from "./layouts/App/Collections/Collections";
import Donations from "./layouts/App/Donations/Donations";
import Voluntary from './layouts/App/Voluntary/Voluntary';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/hub"
        render={props => {
          return <Hub {...props} />;
        }}
      />
      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
      />
      <Route
        path="/collections"
        render={props => {
          return <Collections {...props} />;
        }}
      />
      <Route
        path="/donations"
        render={props => {
          return <Donations {...props} />;
        }}
      />
      <Route
        path="/voluntary"
        render={props => {
          return <Voluntary {...props} />;
        }}
      />
      <Redirect to="/login" />
    </Switch>
  </Router>,
document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
