import React, { useState } from 'react'

import axios from 'axios';

import { Typography, Button, Input, message } from "antd";
import { ReactComponent as Logo } from "./assets/logo.svg";
import "./ForgetPassword.css"

const ForgetPassword = ({history}) => {
  const [email, setEmail] = useState("");

  const handleEmailInput = e => {
    setEmail(e.target.value)
  }

  const handleResetPassword = () => {
    axios
    .post('/reset', {email})
    .then((res) => {
      if (res.status === 200) {
        history.push('/user/login');
        message.success(res.data.message)
      }
    })
    .catch((err) => {
      message.error(err.response.data.message)
      console.error(err.response.data);
    });
  }

  return (
    <>
      <Logo className="forgetPassword__logo" onClick={ () => history.push('/user/login')}/>
      <div className="forgetPassword__dialog">
        <div className="forgetPassword__content">
          <Typography.Title type={1}>Retrieve password</Typography.Title>
          <p>We'll send you an email if you have registered with us before</p>
          <Input 
            onChange={handleEmailInput}
            placeholder="Email"
          />
        </div>
        <Button 
          onClick={handleResetPassword}
          className="forgetPassword__confirm" 
          type="primary" 
          htmlType="submit"
        >
          Confirm
        </Button>
      </div>
    </>
  )
  
}

export default ForgetPassword
