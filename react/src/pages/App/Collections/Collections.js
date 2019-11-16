import React, { Component } from 'react'
import SearchHeader from "components/SearchHeader";
import BookListPagination from "components/BookListPagination"
import FilterColumn from "components/FilterColumn"

import { Typography,  } from "antd";
import "./Collections.css"

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export class Collections extends Component {
  state = {
    listdata: [],
    loading: true
  }

  getDonations = axios.get('/donations')
    .then((res) => {
      let temp = [];
      res.data.forEach(book => {
        temp.push({
          img: book.img,
          title: book.title,
          author: book.author,
          tag: book.tag,
          key: book.id,
        })
      })
      this.setState({listdata: temp, loading: false});
    })
    .catch((err) => { console.error(err); });

  render() {
    const {listdata, loading} = this.state
    return (
      <div className="collections__container">
        <SearchHeader/>
        <Typography.Title level={2}>New Donation Uploads</Typography.Title>
        <BookListPagination data={listdata} loading={loading} pageSize={9} showOption={false}/>
        <FilterColumn filterType={["title", "author", "genre"]}/>
      </div>
    )
  }
}

export default Collections
