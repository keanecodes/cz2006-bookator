import React, { Component } from 'react'
import SearchHeader from "components/SearchHeader";
import BookListPagination from "components/BookListPagination"
import FilterColumn from "components/FilterColumn"

import { Typography,  } from "antd";
import "./Collections.css"

const listData = [];
for (let i = 0; i < 100; i++) {
  listData.push({
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    score: 3.8,
    title: `The Water Cure ${i}`,
    author: `James Ramos ${i}`,
    tag: 'Biography',
    showOptions: false,
    // loading: true
  });
}

export class Collections extends Component {

  render() {
    return (
      <div className="collections__container">
        <SearchHeader/>
        <Typography.Title level={2}>New Donation Uploads</Typography.Title>
        <div className="collections__body">
          <BookListPagination data={listData} pageSize={9}/>
          <FilterColumn filterType={["title", "author", "genre"]}/>
        </div>
      </div>
    )
  }
}

export default Collections
