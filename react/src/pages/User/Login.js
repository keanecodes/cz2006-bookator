//REACT CORE PACKAGES
import React, { Component } from "react";
import PropTypes from 'prop-types';
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from 'redux/actions/userActions';

//UI STUFF
import { Form, Icon, Input, Button } from "antd";
import "./Login.css";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as BackDrop1 } from "./assets/men-book.svg";

// import routes from "routes.js";

class Login extends Component {
  state = {
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (this.props.UI.errors !== prevProps.UI.errors) {
      this.setState({ errors: this.props.UI.errors });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, formValues) => {
      if (!err) {
        this.props.loginUser(formValues, this.props.history);
      }
    });
  };

  render() {
    const { UI: { loading } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { errors } = this.state;
    return (
      <>
        <div className="Auth">
          <BackDrop1 className="auth-decor auth-backdrop1" />
          <div className="login-box">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="login-fields-wrapper">
                <Logo className="logo-icon" />
                <div className="fields-box">
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

                  <Button type="link" onClick={() => this.props.history.push('/user/forget')}>Forgot Password?</Button>
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
              </div>
              <div className="btns-box">
                <Button onClick={() => this.props.history.push('/user/register')}>Sign Up</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
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

Login.propTypes = {
  // classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};
const WrappedLogin = Form.create()(Login);

export default connect( mapStateToProps, mapActionsToProps )(WrappedLogin);
