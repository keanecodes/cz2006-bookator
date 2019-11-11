import React, { Component } from 'react'

import { List, Skeleton } from 'antd';
import "./LocationListPagination.css"

export class LocationListPagination extends Component {
  render() {
    return (
      <>
       <List
          className="locationlistpagination__container"
          grid={{
            gutter: 16,
            xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3
          }}
          pagination={{
            pageSize: this.props.pageSize,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
          }}
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item key={item.locName}>
              <Skeleton title={true} loading={item.loading} active>
                <div className="list-item__left-corner">
                  <p>{item.books > -1 ? item.books : 0}</p>
                  <div>
                    <p>BOOKS</p>
                    <span>to deliver</span>
                  </div>
                </div>

                <p className="list-item__distanceAway">
                  {item.distanceAway ? item.distanceAway : 0}m away
                </p>
                <p className="list-item__locName">
                  {item.locName ? item.locName : "Unknown"}
                </p>
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    )
  }
}

export default LocationListPagination
