//REACT CORE PACKAGES
import React, { Component } from "react";
import ReactDOM from 'react-dom';

//UI STUFF
import "./Register.css";
import { ReactComponent as BackDrop1 } from "./assets/men-book.svg";

import { Form, Input,Button, Typography, Upload, Icon } from 'antd';



class Register extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent.');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="register__container">
        <div className="reg-decor">
          <BackDrop1/>
        </div>
        <Form className="reg-form" onSubmit={this.handleSubmit}>
          <div className="txt-decor">
            <Typography.Title type={1}>Registration</Typography.Title>
            <p>Tell us more about you</p>
          </div>
          <div className="registration-fields-wrapper">
            <div className="reg-profile">
              <Form.Item className="upload">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                    <Icon type="camera" /> <br/>Upload<br/> Photo
                    </Button>
                  </Upload>,
                )}
              </Form.Item>
              <div className="reg-names">
                <Form.Item>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your name.', whitespace: true }],
                  })(<Input placeholder="Name"/>)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your nickname.', whitespace: true }],
                  })(<Input placeholder="Preferred username"/>)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('email', {rules: [
                      { type: 'email', message: 'The input is not valid E-mail.' },
                      { required: true, message: 'Please input your E-mail.' },
                    ]})(<Input placeholder="Email"/>)
                  }
                </Form.Item>
              </div>
            </div>

            <div className="password-fields">
              <Form.Item hasFeedback>
                {getFieldDecorator('password', { rules: [
                    { required: true, message: 'Please input your password.' },
                    { validator: this.validateToNextPassword },
                  ]})(<Input.Password placeholder="Password"/>)
                }
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator('confirm', { rules: [
                    { required: true, message: 'Please confirm your password.' },
                    { validator: this.compareToFirstPassword },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm Password"/>)}
              </Form.Item>
            </div>
            <Button className="register-btn" type="primary" htmlType="submit">Sign me up!</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedRegister= Form.create()(Register);
ReactDOM.render(<WrappedRegister />, document.getElementById('root'));

export default WrappedRegister;