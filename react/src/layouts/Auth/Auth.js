import React, { Component } from 'react';
import "./Auth.css"

import { Input } from 'antd';
import { Button } from 'antd';

import { ReactComponent as Logo } from "../../logo.svg";
import { ReactComponent as BackDrop1 } from "./assets/men-book.svg";
// import { ReactComponent as BackDrop2 } from "./assets/front-woman-book.svg";
// import { ReactComponent as BackDrop3 } from "./assets/side-women-book.svg";

// import routes from "routes.js";

class AuthLayout extends Component {
  render() {
    return (
      <>
        <div className="Auth">
        <BackDrop1 className="auth-decor auth-backdrop1" />
          <div class="login-box">
            <div class="logo-box">
              <Logo class="logo-icon"/>
              <br/>
              bookator
            </div>

            <div class="fields-box">
              <Input placeholder="Username" />
              <Input placeholder="Password" />
              <Button type="link">Forgot Password?</Button>
            </div>

            <div class="btns-box">
              <Button>Sign Up</Button>
              <Button type="primary">Login</Button>
            </div>

          </div>

          {/* <BackDrop3 className="auth-decor auth-backdrop3" />
          <BackDrop2 className="auth-decor auth-backdrop2" /> */}

        </div>
      </>
    );
  }
}

export default AuthLayout;