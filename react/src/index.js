import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
// import jwtDecode from "jwt-decode";
// import AuthRoute from "util/AuthRoute"
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// import { SET_AUTHENTICATED } from './redux/types';
// import { logoutUser, getUserData } from './redux/actions/userActions';

import "antd/dist/antd.css";
import './index.css';

import * as serviceWorker from './serviceWorker';

import AppLayout from "./pages/App/AppLayout"
import Login from "./pages/User/Login"
import Page404 from "./pages/Page404"
import { getRoutes } from "routes.js";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const hist = createBrowserHistory();

// let authenticated;
// const token = localStorage.AuthToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   console.log(decodedToken)
//   if (decodedToken.exp * 1000 < Date.now()) {
//     authenticated = false;
//     window.location.href = '/auth/login';
//   } else {
//     authenticated = true;
//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route
          exact path="/"
          render={props => {
            return <Login {...props} />;
          }}
        />
        {/* <AuthRoute exact path="/auth/login" component={Login} render={(props) =>
            authenticated === true ?  <Redirect to="/user/hub" /> : <Component {...props} />
          }
        />
        <AuthRoute exact path="/auth/register" component={Register} render={(props) =>
            authenticated === true ?  <Redirect to="/user/hub" /> : <Component {...props} />
          }
        /> */}

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
    </Router>
  </Provider>,
document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
