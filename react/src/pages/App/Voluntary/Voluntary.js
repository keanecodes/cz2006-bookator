import React, { Component } from 'react'
import Profile from "components/Profile"
import LocationListPagination from "components/LocationListPagination"
import FilterColumn from "components/FilterColumn"

import { Typography, Switch, Icon } from "antd";
import "./Voluntary.css"

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    distanceAway: 20,
    books: i,
    locName: `Popstation ${i}`,
    // loading: true
  });
}

export class Voluntary extends Component {
  render() {
    return (
    <div className="voluntary__container">
      <Profile/>
      <div className="voluntary__header">
        <Typography.Title level={2}>Book delivery requests</Typography.Title>
        <Switch className="voluntary__viewToggle"
          checkedChildren={<><Icon type="environment"/>{" "}Map View</>}
          unCheckedChildren={<><Icon type="menu"/>{" "}List View</>}
        />
      </div>
      <LocationListPagination data={listData} pageSize={12}/>
      <FilterColumn filterType={["number of books", "distance", "alphabetical"]}/>
    </div>
    )
  }
}

export default Voluntary
