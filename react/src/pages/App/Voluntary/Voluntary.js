import React, { Component } from 'react'

import { Typography } from "antd";
import "./Voluntary.css"

export class Voluntary extends Component {
  render() {
    return (
    <div className="voluntary__container">
      <Typography.Title level={2}>Book delivery requests</Typography.Title>
    </div>
    )
  }
}

export default Voluntary
