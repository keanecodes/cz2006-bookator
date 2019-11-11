import React, { Component } from 'react'

import SearchHeader from "components/SearchHeader";

import { Typography } from "antd";
import "./Donations.css"

export class Donations extends Component {
  render() {
    return (
    <div className="donations__container">
      <SearchHeader/>
      <Typography.Title level={2}>Donated book</Typography.Title>
    </div>
    )
  }
}

export default Donations
