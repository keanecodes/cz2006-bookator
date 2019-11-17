import React, { Component } from 'react'

import { List, Skeleton, Tag, Empty, Menu, Dropdown, Icon } from 'antd';
import "./BookListPagination.css"


export class BookListPagination extends Component {
  state = {
    skeletonData: [],
  }

  genre = ["Fiction"]

  componentDidMount() {
    let data = []
    for (let i = 0; i < this.props.pageSize; i++) {
      data.push({loading: true})
    }
    this.setState({skeletonData: data});
  }

  render() {

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
          dataSource={ this.props.loading && this.props.data.length === 0 ? this.state.skeletonData : this.props.data }
          renderItem={item => (
            <List.Item key={item.key}>
              <Skeleton title={true} loading={item.loading } active>
                { (this.props.showOptions || item.showOptions) && item.status !== "Donated"
                  ? (<Dropdown overlay={
                    item.status === "Pending"
                    ? (<Menu>
                        <Menu.Item  key={item.key ? `edit-${item.key}` : 0}>
                          {/* eslint-disable-next-line */}
                          <a href="#" style={{color: "#4275FF"}}>
                            <Icon type="edit" /> &nbsp; Edit
                          </a>
                        </Menu.Item>
                        <Menu.Item onClick={() => this.props.handleMenuDelete(item)}
                          style={{color: "red"}} key={item.key ? `delete-${item.key}` : 0}>
                          <Icon type="delete" /> Delete
                        </Menu.Item>
                      </Menu>)
                    : (<Menu>
                        <Menu.Item key={item.key ? `edit-${item.key}` : 0}>
                          {/* eslint-disable-next-line */}
                          <a href="#" style={{color: "#4275FF"}}>
                            <Icon type="edit" /> &nbsp; Edit
                          </a>
                        </Menu.Item>
                      </Menu>)
                  }
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
                {this.genre.includes(item.tag)
                 ? (<Tag className="list-item__tag" color="cyan">{item.tag}</Tag>)
                 : item.status === "Pending"
                   ? (<Tag className="list-item__tag" color="yellow">{item.status}</Tag>)
                   : item.status === "Deposited"
                    ? (<Tag className="list-item__tag" color="purple">{item.status}</Tag>)
                    : item.status === "Donated"
                      ? (<Tag className="list-item__tag" color="cyan">{item.status}</Tag>)
                      : (<Tag className="list-item__tag" color="red">{item.status}</Tag>)
                }
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default BookListPagination
