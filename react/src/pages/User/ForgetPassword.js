import React, { Component } from 'react'
import { Typography, Button, Input } from "antd";
import { ReactComponent as Logo } from "./assets/logo.svg";
import "./ForgetPassword.css"
export class ForgetPassword extends Component {
  render() {
    return (
      <>
        <Logo className="forgetPassword__logo" onClick={ () => this.props.history.push('/user/login')}/>
        <div className="forgetPassword__dialog">
          <div className="forgetPassword__content">
            <Typography.Title type={1}>Retrieve password</Typography.Title>
            <p>We'll send you an email if you have registered with us before</p>
            <Input placeholder="Email"></Input>
          </div>
          <Button className="forgetPassword__confirm" type="primary" htmlType="submit">Confirm</Button>
        </div>
      </>
    )
  }
}

export default ForgetPassword
