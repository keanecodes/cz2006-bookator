import React, { Component } from 'react'

import SearchHeader from "components/SearchHeader";

import { Typography } from "antd";
import "./Collections.css"

export class Collections extends Component {
  render() {
    return (
      <div className="collections__container">
        <SearchHeader/>
        <Typography.Title level={2}>New Donation Uploads</Typography.Title>
      </div>
    )
  }
}

export default Collections
