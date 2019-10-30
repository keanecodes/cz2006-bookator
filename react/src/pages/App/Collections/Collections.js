import React, { Component } from 'react'
import { Typography } from "antd";

import CollectionsHeader from "components/CollectionsHeader";

export class Collections extends Component {
  render() {
    return (
      <div>
        <CollectionsHeader/>
        <Typography.Title level={1}>New Donation Uploads</Typography.Title>
      </div>
    )
  }
}

export default Collections
