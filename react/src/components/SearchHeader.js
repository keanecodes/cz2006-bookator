import React, { Component } from 'react'
import Profile from "./Profile";

import { Layout, Select } from "antd";
import "./SearchHeader.css";

import jsonp from 'fetch-jsonp';
import querystring from 'querystring';


let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const { result } = d;
          const data = [];
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}

export class CollectionsHeader extends Component {

  state = {
    data: [],
    value: undefined,
  };

  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const options = this.state.data.map(d => <Select.Option key={d.value}>{d.text}</Select.Option>);
    return (
      <>
        <Layout.Header className="collections__header">
          <Select
            className="collections__header-search"
            showSearch
            value={this.state.value}
            placeholder="Search books by name, genre, etc..."
            style={this.props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            notFoundContent={null}
          >
            {options}
          </Select>
          <Profile/>
        </Layout.Header>
      </>
    )
  }
}

export default CollectionsHeader
