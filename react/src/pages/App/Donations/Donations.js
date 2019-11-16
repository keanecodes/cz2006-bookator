import React, { Component } from 'react'

import SearchHeader from "components/SearchHeader";
import BookListPagination from "components/BookListPagination"

import { Typography, Button, Icon, Modal, Steps, message, Input, Upload } from "antd";
import "./Donations.css"

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const { Step } = Steps;

const steps = [
  {
    title: 'Description',
    content:(
      <div>
        <center><br/><p>Let's start with the basic details</p></center>
        <div style={{display: "inline-flex"}}>
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button style={{width: "10vw", height:"15vh"}}><Icon type="camera" /> <br/>Upload<br/> Photo</Button>
          </Upload>
          <div>
            <Input placeholder="Title (required)"></Input>
            <Input.TextArea rows={2} placeholder="Descriptions"></Input.TextArea>
          </div>
        </div>
        <Input placeholder="Tags"></Input>
        <br/><br/>
      </div>
    ),
  },
  {
    title: 'Location',
    content: (
      <div>
        <center><br/><p>Let others know where <br/> your book will be up for collection</p></center>
        <Input placeholder="Location"></Input>
        <br/><br/>
      </div>
    ),
  },
  {
    title: 'Done',
    content: (
      <center><p><br/><br/>And... it's up!<br/> Thank you for your donation.<br/><br/></p></center>
    ),
  },
];

export class Donations extends Component {
  state = {
    donations: [],
    collections: [],
    loading: true,
    visible: false,
    current: 0,
  };

  getUserBooks = type => {
    axios.get(`/user/${type}`)
    .then((res) => {
      let temp = [];
      res.data.map(book => {
        temp.push({
          img: book.img,
          title: book.title,
          author: book.author,
          [type === "donations" ? "status" : "tag"]: type === "donations" ? book.status : book.tag,
          key: book.id,
        })
      })
      this.setState({[`${type}`]: temp, loading: false});
    })
    .catch((err) => { console.error(err); });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  componentDidMount() {
    this.getUserBooks("donations");
    this.getUserBooks("collections");
  }

  render() {
    const { visible, current, donations, collections, loading } = this.state;
    return (
    <div className="donations__container">
      <SearchHeader/>
      <div>
        <Typography.Title level={2}>Donated book</Typography.Title>
        <Button className="donations__upload" type="primary" onClick={this.showModal}>
          <Icon type="upload"/>
          {window.innerWidth > 995 ? "New Donation" : ""}
        </Button>
      </div>
      <BookListPagination data={donations} loading={loading} pageSize={6} showOptions={true}/>
      <Typography.Title level={2}>Collected book</Typography.Title>
      <BookListPagination data={collections} loading={loading} pageSize={6}/>
      <Modal
          visible={visible}
          title="New Donation Upload"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}>
          <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button onClick={() => this.next()} style={{float: "right"}} type="primary">
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            // <Button style={{width: "100%"}} type="primary" onClick={() => {this.destroy();this.setState({current: 0})}}>
            <Button style={{width: "100%"}} type="primary">
              Done
            </Button>
          )}
          {current > 0 && current !== steps.length - 1 && (
            <Button style={{float: "left"}}  onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
        </Modal>
    </div>
    )
  }
}

export default Donations
