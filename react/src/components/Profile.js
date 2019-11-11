import React, { Component } from 'react'
import { Avatar } from "antd";

import "./Profile.css"

export class Profile extends Component {
  render() {
    return (
      <div className="header__profile">
        <Avatar size="large" icon="user" className="collections__header-avatar" />
        <span>Ben Tan</span>
      </div>
    )
  }
}

export default Profile
