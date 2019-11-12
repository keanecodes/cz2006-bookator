import React, { Component } from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from "antd";

import "./Profile.css"

export class Profile extends Component {
  render() {
    const {
      user: {
        credentials: { name },
        authenticated
      }
    } = this.props;
    return (
      <Link to="/user/profile" className="header__profile">
        <Avatar size="large" icon="user" className="collections__header-avatar" style={{ backgroundColor: 'transparent', border: "3px solid #4275FF" }}/>
        <span>{authenticated ? name : "loading"}</span>
      </Link>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Profile);
