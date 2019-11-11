import React, { Component } from 'react'
import Profile from "components/Profile"

import { Typography } from "antd";
import "./Voluntary.css"

export class Voluntary extends Component {
  render() {
    return (
    <div className="voluntary__container">
      <Profile/>
      <Typography.Title level={2}>Book delivery requests</Typography.Title>
    </div>
    )
  }
}

export default Voluntary
