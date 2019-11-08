//User routes
import Hub from "pages/User/Hub";
import Login from "pages/User/Login";
import Register from "pages/User/Register";
//App routes
import Collections from "pages/App/Collections/Collections";
import Donations from "pages/App/Donations/Donations";
import Voluntary from 'pages/App/Voluntary/Voluntary';
//Error routes
import Page404 from 'pages/Page404';
//React to create Routes here instead of in layouts to avoid repeating codes
import React from 'react'
import { Route } from "react-router-dom";

export let routes = [
  {
    path: "/login",
    name: "Dashboard",
    component: Login,
    layout: "/user"
  },
  {
    path: "/register",
    name: "Dashboard",
    component: Register,
    layout: "/user"
  },
  {
    path: "/hub",
    name: "User Hub",
    component: Hub,
    layout: "/user"
  },
  {
    path: "/collections",
    name: "Books Collections",
    icon: "read",
    component: Collections,
    layout: "/app"
  },
  {
    path: "/donations",
    name: "Donation Exchange",
    icon: "solution",
    component: Donations,
    layout: "/app"
  },
  {
    path: "/voluntary",
    name: "Delivery Volunteer",
    icon: "team",
    component: Voluntary,
    layout: "/app"
  },
  {
    path: "/page404",
    name: "Page 404",
    component: Page404,
    layout: "/error"
  }
];

export const getRoutes = layoutPath => {
  return routes.map((prop, key) => {
    if (prop.collapse) {
      return this.getRoutes(prop.views);
    }
    if (prop.layout === layoutPath) {
      return (
        <Route
          exact path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    } else {
      return null;
    }
  });
}