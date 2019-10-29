import React, { Component } from 'react'
import { NavLink } from "react-router-dom"

import { Layout, Menu, Icon } from 'antd'

import { routes } from "routes.js"

export class Sidebar extends Component {
  createLinks = routes => {
    // eslint-disable-next-line
    return routes.map((prop, key) => {
      if (prop.layout === "/app") {
        return (
          <Menu.Item className={this.activeRoute(prop.layout + prop.path)} key={key}>
            <NavLink to={prop.layout + prop.path} activeClassName="">
              {prop.icon !== undefined ? (
                <>
                  <Icon type={prop.icon} />
                  <span>{prop.name}</span>
                </>
              ) : ( <> <span>{prop.name}</span> </> )}
            </NavLink>
          </Menu.Item>
        );
      }
    });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? "ant-menu-item-selected" : "";
  };
  render() {
    return (
      <>
        <Layout.Sider
          theme="light"
          breakpoint="lg"
          onBreakpoint={broken => {
            console.log(broken);
          }}
        >
          <div className="logo" style={{ height: "32px", background: "rgba(0, 0, 0, 0.2)", margin: "16px"}}/>
          <Menu mode="inline">
            {this.createLinks(routes)}
          </Menu>
        </Layout.Sider>
      </>
    )
  }
}

export default Sidebar
