import React, { Component } from 'react'

import SearchHeader from "components/SearchHeader";
import BookListPagination from "components/BookListPagination"

import { Typography, Button, Icon } from "antd";
import "./Donations.css"

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    title: `The Water Cure ${i}`,
    author: `James Ramos ${i}`,
    tag: 'Biography',
    // loading: true
  });
}

export class Donations extends Component {
  render() {
    return (
    <div className="donations__container">
      <SearchHeader/>
      <div>
        <Typography.Title level={2}>Donated book</Typography.Title>
        <Button className="donations__upload" type="primary">
          <Icon type="upload"/>
          {window.innerWidth > 995 ? "New Donation" : ""}
        </Button>
      </div>
      <BookListPagination data={listData} pageSize={6} showOptions={true}/>
      <Typography.Title level={2}>Collected book</Typography.Title>
      <BookListPagination data={listData} pageSize={6}/>
    </div>
    )
  }
}

export default Donations
