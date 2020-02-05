import React, { useState } from 'react'
import Profile from "components/Profile"
import LocationListPagination from "components/LocationListPagination"
// import FilterColumn from "components/FilterColumn"

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

const Voluntary = () => {
  const [mapView, toggleMapView] = useState(false);

  
  return (
    <div className="voluntary__container">
      <Profile/>
      <div className="voluntary__header">
        <Typography.Title level={2}>Book delivery requests</Typography.Title>
        <div className="voluntary__viewToggle">
          <Switch className="voluntary__viewToggle--switch"
            checkedChildren={<Icon type="environment"/>}
            unCheckedChildren={<Icon type="menu"/>}
            onChange={() => {toggleMapView(!mapView)}}
          />
          <span className="voluntary__viewToggle--label">{mapView ? "Map View" : "List View"}</span>
        </div>
      </div>
      <LocationListPagination data={listData} pageSize={12}/>
      {/* <FilterColumn filterType={["number of books", "distance", "alphabetical"]}/> */}
    </div>
  )
  
}

export default Voluntary
