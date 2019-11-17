import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchHeader from "components/SearchHeader";
import BookListPagination from "components/BookListPagination"

import { Typography, Button, Icon, Modal, Steps, message, Input, Upload, Form } from "antd";
import "./Donations.css"

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const { Step } = Steps;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export class Donations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donations: [],
      collections: [],
      listLoading: true,
      imgLoading: false,
      form: {
        title: "",
        author: "",
        tag: "",
        depositPoint: ""
      },
      visible: false,
      current: 0,
    };

    this.next = this.next.bind(this);
  }


  getUserBooks = type => {
    axios.get(`/user/${type}`)
    .then((res) => {
      let temp = [];
      res.data.forEach(book => {
        temp.push({
          img: book.img,
          title: book.title,
          author: book.author,
          [type === "donations" ? "status" : "tag"]: type === "donations" ? book.status : book.tag,
          key: book.donationId,
        })
      })
      this.setState({[`${type}`]: temp, listLoading: false});
    })
    .catch((err) => { console.error(err); });
  }

  showModal = () => { this.setState({ current: 0 }, () => {
    this.setState({visible: true});
  })};

  handleClose = () => { this.setState({ visible: false }) };

  next = () => {
    if (this.state.current === 1) {
      message.loading('Uploading donation...');
      axios
        .post('/donate', {
          title: this.state.form.title,
          author: this.state.form.author,
          tag: this.state.form.tag,
          depositPoint: this.state.form.depositPoint,
          donator: this.props.user.credentials.username,
        }).then( res => {
          console.log(res)
          this.setState({listLoading: true, donations: []}, () => {
            this.setState({form: {title: "", author: "", tag: "", depositPoint: ""}})
            this.getUserBooks("donations");
            message.destroy();
            message.success(`Success! Please deposit your book to ${this.state.form.depositPoint} within 21 days.`);
          })
        })
        .catch(function (error) {
          message.error("Oops, there something went wrong.");
          console.log(error);
        })
    }

    this.setState({ current: this.state.current + 1 })
  }

  prev = () => { this.setState({ current: this.state.current - 1 }) }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ imgLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          imgLoading: false,
        }),
      );
    }
  };

  handleMenuDelete = item => {
    message.loading(`Attempting to delete ${item.title}`);
    axios.delete(`/donation/${item.key}`).then(res => {
      const newArr = this.state.donations.filter(book => book.key !== item.key)
      this.setState({donations: newArr}, () => {
        message.destroy();
        message.success(`Deleted ${item.title} successfully.`)
      });
    }).catch(err => {
      message.destroy();
      message.error("Oops, there something went wrong.");
      console.log(err);
    });
  }

  componentDidMount() {
    this.getUserBooks("donations");
    this.getUserBooks("collections");
  }

  render() {
    const { visible, current, donations, collections, listLoading, imageUrl } = this.state;
    const steps = [
      {
        title: 'Description',
        content:(
          <div>
            <center><br/><p>Let's start with the basic details</p></center>
            <div style={{display: "inline-flex", width: "100%", height: "100%"}}>
              <Upload
                listType="picture-card"
                action={process.env.REACT_APP_API_BASE_URL + "/donate/image"}
                name="uploadDonation"
                className="donation__upload-modal__avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl
                  ? (<img src={imageUrl} alt="uploadDonation" style={{ width: '100%' }} />)
                  : (<div>
                    <Icon type={this.state.imgLoading ? 'loading' : 'camera'} />
                    <div className="ant-upload-text">
                      {this.state.imgLoading
                        ? (<>Please<br/>Wait</>)
                        : (<>Upload<br/>Photo</>)
                      }
                    </div>
                  </div>)
                }
              </Upload>
              <div>
                {/* <Form.Item> */}
                  <Input placeholder="Title (required)" onChange={e => this.setState({form:{...this.state.form, title: e.target.value }})}/>
                {/* </Form.Item>
                <Form.Item> */}
                  <Input placeholder="Author (required)" onChange={e => this.setState({form:{...this.state.form, author: e.target.value }})}/>
                {/* </Form.Item> */}
              </div>
            </div>
            {/* <Form.Item> */}
              <Input placeholder="Tags" onChange={e => this.setState({form:{...this.state.form, tag: e.target.value}})}/>
            {/* </Form.Item> */}
            <br/><br/>
          </div>
        ),
      },
      {
        title: 'Location',
        content: (
          <div>
            <center><br/><p>Let others know where <br/> your book will be up for collection</p></center>
            {/* <Form.Item> */}
              <Input placeholder="Location" onChange={e => this.setState({form:{...this.state.form, depositPoint: e.target.value }})}/>
            {/* </Form.Item> */}
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
      <BookListPagination data={donations} loading={listLoading} pageSize={6} showOptions={true} handleMenuDelete={this.handleMenuDelete.bind(this)}/>
      <Typography.Title level={2}>Collected book</Typography.Title>
      <BookListPagination data={collections} loading={listLoading} pageSize={6}/>
      <Modal
          visible={visible}
          title="New Donation Upload"
          className="donations__upload-modal"
          onCancel={this.handleClose}
          footer={[]}>
          <Form>
            <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Form>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button onClick={() => this.next()} style={{float: "right"}} type="primary">
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            // <Button style={{width: "100%"}} type="primary" onClick={() => {this.destroy();this.setState({current: 0})}}>
            <Button onClick={this.handleClose} style={{width: "100%"}} type="primary">
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

const mapStateToProps = (state) => ({
  user: state.user
});

Donations.propTypes = {
  user: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Donations);