import React, { Component } from 'react'
import { Switch } from "react-router-dom";
import { getRoutes } from "routes.js";
import { Layout } from 'antd';

import Sidebar from 'components/Sidebar';

export class AppLayout extends Component {
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      // this.mainPanel.current.scrollTop = 0;
    }
  }

  render() {
    return (
      <div className="AppLayout">
        <Layout style={{ minHeight: '100vh', background: '#fff' }}>
          <Sidebar/>
          <Layout>
            <Layout.Content style={{background: "#fff"}}>
              <Switch>
                {getRoutes("/app")}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>

      </div>
    )
  }
}

export default AppLayout
