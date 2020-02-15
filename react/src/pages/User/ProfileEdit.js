import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Typography, Button, Icon } from "antd";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as BookCollections } from "./assets/book-collections.svg";
import { ReactComponent as DonationExchange } from "./assets/donation-exchange.svg";
import { ReactComponent as VoluntaryDelivery } from "./assets/voluntary-delivery.svg";
import { ReactComponent as Decor } from "./assets/profile-edit-decor.svg";
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
      <>
      <div className="profile__decor">
          <Decor className="profile__decor-svg profile__decor--left"/>
          <Decor className="profile__decor-svg profile__decor--topright"/>
          <Decor className="profile__decor-svg profile__decor--botright"/>
        </div>
        <div className="profile__cont">
          <div className="profile__user-cont">
            <Profile className="profile__user-icon"/>
            <div className="profile__details-cont">
              <div className="profile__header-bar">
                <Typography.Title type={1}>{ authenticated ? name : "loading"}</Typography.Title>
                <Button><Icon type="edit" /> Edit</Button>
              </div>
              <p>@{ authenticated ? username : "______"}</p>
              <p>{ authenticated ? mobile : "______"}</p>
            </div>
          </div>
          <div className="profile__stats-cont">
            <div className="profile__stat profile__stat--book-collections" onClick={()=>{this.props.history.push('/app/collections');}}>
              <div>
                <BookCollections/>
                <span>{collections  ? collections.length : 0}</span>
              </div>
              <p>Collections</p>
            </div>
            <div className="profile__stat profile__stat--book-donations" onClick={()=>{this.props.history.push('/app/donations');}}>
              <div>
                <DonationExchange/>
                <span>{donations ? donations.length : 0}</span>
              </div>
              <p>Donations</p>
            </div>
            <div className="profile__stat profile__stat--book-voluntary" onClick={()=>{this.props.history.push('/app/voluntary');}}>
              <div>
                <VoluntaryDelivery/>
                <span>{voluntaries ? voluntaries.length : 0}</span>
              </div>
              <p>Voluntaries</p>
            </div>
          </div>
        </div>
      </>
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
