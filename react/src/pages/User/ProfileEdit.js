import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Typography, Button, Statistic } from "antd";
import "./ProfileEdit.css"

export class ProfileEdit extends Component {
  render() {
    const {
      user: {
        credentials: { name, username, mobile },
        donations,
        collections,
        voluntaries,
        authenticated
      }
    } = this.props;
    return (
      <div className="profile__cont">
        <div className="profile__details-cont">
          <div className="profile__header-bar">
            <Typography.Title type={1}>{name}</Typography.Title>
            <Button>Edit</Button>
          </div>
          <p>@{username}</p>
          <p>{mobile}</p>
        </div>
        <div className="profile__stats-cont">
          <Statistic title="Collections" value={donations ? donations.length : 0} />
          <Statistic title="Donations" value={collections.length ? collections.length : 0} />
          <Statistic title="Voluntaries" value={voluntaries.length ? voluntaries.length : 0} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

ProfileEdit.propTypes = {
  user: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ProfileEdit);
