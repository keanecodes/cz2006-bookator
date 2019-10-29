import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import axios from 'axios'

import "antd/dist/antd.css";
import './index.css';

import * as serviceWorker from './serviceWorker';

import AppLayout from "./pages/App/AppLayout"
import Login from "./pages/User/Login"
import Page404 from "./pages/Page404"
import { getRoutes } from "routes.js";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        exact path="/"
        render={props => {
          return <Login {...props} />;
        }}
      />
      {getRoutes("/user")}
      <Route
        path="/app"
        render={props => {
          return <AppLayout {...props} />;
        }}
      />
      <Route render={props => {
        return <Page404 {...props} />;
      }} />
    </Switch>
  </Router>,
document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
