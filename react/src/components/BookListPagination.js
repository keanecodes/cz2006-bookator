import React, { Component } from 'react'

import { List, Skeleton, Tag, Empty, Menu, Dropdown, Icon } from 'antd';
import "./BookListPagination.css"


export class BookListPagination extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          {/* eslint-disable-next-line */}
          <a href="#">Delete</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <List
          className="booklistpagination__container"
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
            <List.Item key={item.title}>
              <Skeleton title={true} loading={item.loading} active>
                { this.props.showOptions || item.showOptions
                  ? (<Dropdown overlay={menu}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    {/* eslint-disable-next-line */}
                    <a className="list-item__options" href="#">
                      <Icon type="more" />
                    </a>
                  </Dropdown>)
                  : null
                }
                {item.img ? (
                  <img className="list-item__img" alt="logo" src={item.img} />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}

                <p className="list-item__score">
                  {item.score ? item.score : null}
                </p>
                <p className="list-item__title">
                  {item.title ? item.title : "Untitled"}
                </p>
                <span className="list-item__author">
                  {item.author ? item.author : "Unknown"}
                </span>
                <br />
                {item.tag ? (
                  <Tag className="list-item__tag" color="cyan">
                    {item.tag}
                  </Tag>
                ) : null}
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default BookListPagination
