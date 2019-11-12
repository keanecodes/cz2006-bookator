//REACT CORE PACKAGES
import React, { Component } from "react";
import ReactDOM from 'react-dom';

//OTHER PACKAGES
import axios from 'axios';

//UI STUFF
import "./Register.css";
import { ReactComponent as BackDrop1 } from "./assets/men-book.svg";
import { Form, Input, Button, Typography } from 'antd';

class Register extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false,
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, formValues) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          axios
          .post('/signup', formValues)
          .then(res => {
            localStorage.setItem('AuthToken', `Bearer ${res.data.token}`);
            this.setState({loading: false});
            this.props.history.push('/user/hub');
          })
          .catch(err => {
            this.setState({
              loading: false,
              errors: err.response
                ? err.response.data
                : {general: "Fail to establish connection with our servers :("}
            })
            console.error(this.state.errors);
          })
        });
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
    const { errors } = this.state;
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
            <div className="reg-names">
              <Form.Item validateStatus={errors.name ? "error" : ""} help={errors.name}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name.', whitespace: true }],
                })(<Input placeholder="Name"/>)}
              </Form.Item>
              <Form.Item validateStatus={errors.username ? "error" : ""} help={errors.username}>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your nickname.', whitespace: true }],
                })(<Input placeholder="Preferred username"/>)}
              </Form.Item>
            </div>
            <Form.Item validateStatus={errors.mobile ? "error" : ""} help={errors.mobile}>
              {getFieldDecorator("mobile", { rules: [
                { required: true, message: "Please input your mobile number" },
                { min: 8, message: "The input is not valid Singapre mobile number" },
                { max: 8, message: "The input is not valid Singapre mobile number" },
              ] })(
                <Input placeholder="Mobile Number"/>
              )}
            </Form.Item>
            <Form.Item validateStatus={errors.email ? "error" : ""} help={errors.email}>
              {getFieldDecorator('email', {rules: [
                  { type: 'email', message: 'The input is not valid E-mail.' },
                  { required: true, message: 'Please input your E-mail.' },
                ]})(<Input placeholder="Email"/>)
              }
            </Form.Item>
            <div className="password-fields">
              <Form.Item hasFeedback validateStatus={errors.password ? "error" : ""} help={errors.password}>
                {getFieldDecorator('password', { rules: [
                    { required: true, message: 'Please input your password.' },
                    { validator: this.validateToNextPassword },
                  ]})(<Input.Password placeholder="Password"/>)
                }
              </Form.Item>
              <Form.Item hasFeedback validateStatus={errors.confirmPassword ? "error" : ""} help={errors.confirmPassword}>
                {getFieldDecorator('confirmPassword', { rules: [
                    { required: true, message: 'Please confirm your password.' },
                    { validator: this.compareToFirstPassword },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm Password"/>)}
              </Form.Item>
            </div>
            <br/><br/>
            {errors.general ?
              (<center><p style={{ color: "red"}}>
                {errors.general}
              </p></center>)
              : ""
            }

            <Button className="register-btn" type="primary" htmlType="submit" loading={this.state.loading}>Sign me up!</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedRegister= Form.create()(Register);
ReactDOM.render(<WrappedRegister />, document.getElementById('root'));

export default WrappedRegister;