//REACT CORE PACKAGES
import React, { Component } from "react";
import ReactDOM from 'react-dom';

//OTHER PACKAGES
import axios from 'axios';

//UI STUFF
import { Form, Icon, Input, Button } from "antd";
import "./Auth.css";
import { ReactComponent as Logo } from "../../logo.svg";
import { ReactComponent as BackDrop1 } from "./assets/men-book.svg";

// import routes from "routes.js";

class AuthLayout extends Component {
  state = {
    loading: false,
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          axios
          .post('/login', formValues)
          .then(res => {
            this.setState({loading: false});
            this.props.history.push('/app');
          })
          .catch(err => {
            this.setState({
              errors: err.response.data,
              loading: false
            })
          })
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors } = this.state;
    return (
      <>
        <div className="Auth">
          <BackDrop1 className="auth-decor auth-backdrop1" />
          <div class="login-box">
            <div class="logo-box">
              <Logo class="logo-icon" />
              <br />
              bookator
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div class="fields-box">
                <Form.Item>
                  {getFieldDecorator("email", { rules: [
                    { required: true, message: "Please input your E-mail!" },
                    { type: 'email', message: "The input is not valid E-mail" },
                  ] })(
                    <Input
                      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>} placeholder="Username"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", { rules: [{ required: true, message: "Please input your Password!" }] })(
                    <Input.Password
                      prefix={ <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/> }
                      type="password" placeholder="Password"
                    />
                  )}
                </Form.Item>

                <Button type="link">Forgot Password?</Button>
              </div>
              <br/><br/>
              {errors.general ?
                (<small style={{ color: "red"}}>
                  {errors.general}
                </small>)
                :
                (<small style={{ color: "#BECFFF"}}>
                  Testing out? Try: <br /> user@mail.com | password
                </small>)
              }
              <div class="btns-box">
                <Button>Sign Up</Button>
                <Button type="primary" htmlType="submit" loading={this.state.loading}>
                  Login
                </Button>
              </div>
            </Form>
          </div>

          {/* <BackDrop3 className="auth-decor auth-backdrop3" />
          <BackDrop2 className="auth-decor auth-backdrop2" /> */}
        </div>
      </>
    );
  }
}

const WrappedLogin = Form.create()(AuthLayout);
ReactDOM.render(<WrappedLogin/>, document.getElementById('root'))

export default WrappedLogin;
