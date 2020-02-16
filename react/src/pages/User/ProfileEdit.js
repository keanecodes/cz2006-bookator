import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Typography, Button, Icon, Form, Input } from "antd";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as BookCollections } from "./assets/book-collections.svg";
import { ReactComponent as DonationExchange } from "./assets/donation-exchange.svg";
import { ReactComponent as VoluntaryDelivery } from "./assets/voluntary-delivery.svg";
import { ReactComponent as Decor } from "./assets/profile-edit-decor.svg";
import "./ProfileEdit.css"

export const ProfileEdit = props => {
  const {
    user: {
      credentials: { name, username, mobile },
      donations,
      collections,
      voluntaries,
      authenticated
    }
  } = props;

  const [editMode, toggleEditMode] = useState(false);
  const { getFieldDecorator } = props.form

  useEffect(() => {
    if (editMode) 
      props.form.setFieldsValue({name, username, mobile});
  // eslint-disable-next-line
  }, [editMode]);

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
              {editMode
                ? (
                  <Form.Item>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Name is required!' }],
                    })(<Input placeholder="Name" prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}/>)}
                  </Form.Item>
                )   
                : (<Typography.Title type={1}>
                    { authenticated ? name : "loading"}
                  </Typography.Title>
                )
              }
              <Button
                onClick={() => toggleEditMode(editMode => !editMode)}
                icon={editMode ? "check" : "edit"}
              >
                {editMode ? "Done" : "Edit"}
              </Button>
            </div>
            {editMode
              ? (<>
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: 'Username is required!' }],
                    }
                    )(<Input prefix="@" placeholder="Username"/>)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('mobile', {
                      rules: [{ required: true, message: 'Mobile is required!' }],
                    })(<Input placeholder="Mobile" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}/> )}
                  </Form.Item>
                </>
              )
              : ( <>
                  <p>@{ authenticated ? username : "______"}</p>
                  <p>{ authenticated ? mobile : "______"}</p>
                </>
              )
            }
            
          </div>
        </div>
        <div className="profile__stats-cont">
          <div className="profile__stat profile__stat--book-collections" onClick={()=>{props.history.push('/app/collections');}}>
            <div>
              <BookCollections/>
              <span>{collections  ? collections.length : 0}</span>
            </div>
            <p>Collections</p>
          </div>
          <div className="profile__stat profile__stat--book-donations" onClick={()=>{props.history.push('/app/donations');}}>
            <div>
              <DonationExchange/>
              <span>{donations ? donations.length : 0}</span>
            </div>
            <p>Donations</p>
          </div>
          <div className="profile__stat profile__stat--book-voluntary" onClick={()=>{props.history.push('/app/voluntary');}}>
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

const mapStateToProps = (state) => ({
  user: state.user
});

ProfileEdit.propTypes = {
  user: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
};

const WrappedProfileEdit = Form.create()(ProfileEdit);

export default connect(mapStateToProps)(WrappedProfileEdit);
