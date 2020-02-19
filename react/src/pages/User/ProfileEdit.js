import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from 'redux/actions/userActions';

import { Typography, Button, Icon, Form, Input, Spin } from "antd";
import { ReactComponent as Profile } from "./assets/profile.svg";
import { ReactComponent as BookCollections } from "./assets/book-collections.svg";
import { ReactComponent as DonationExchange } from "./assets/donation-exchange.svg";
import { ReactComponent as VoluntaryDelivery } from "./assets/voluntary-delivery.svg";
import { ReactComponent as Decor } from "./assets/profile-edit-decor.svg";
import "./ProfileEdit.css"

export const ProfileEdit = ({ history, UI, user, form, updateUser }) => {
  const {
    credentials: { name, username, mobile },
    donations,
    collections,
    voluntaries,
    authenticated,
    loading
  } = user;

  const [editMode, switchEditMode] = useState(false);
  const [editing, setEditing] = useState(false);
  const { getFieldDecorator } = form

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, formValues) => {
      if (!err) {
        // console.log(formValues)
        updateUser(formValues);
        setEditing(false); switchEditMode(false);
      }
    });
  };

  useEffect(() => {
    if (editMode) {
      form.setFieldsValue({name, mobile}, () => {
        setEditing(true);
      });
    }
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
        <Spin 
          indicator={
            <Icon type="loading" style={{ fontSize: 24 }}/>
          } 
          spinning={loading}
        >
          <div className="profile__user-cont">
            <Profile className="profile__user-icon"/>
            <div className="profile__details-cont">
              <Form onSubmit={editing ? handleSubmit : null}>
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
                  {editing
                    ? (<Button htmlType="submit" icon="check">Done</Button>)
                    : (<Button onClick={() => switchEditMode(true)} icon="edit">Edit</Button>)
                  }
                </div>
                <p>@{ authenticated ? username : "______"}</p>
                {editMode
                  ? (
                    <>
                      <Form.Item>
                      {getFieldDecorator("mobile", { rules: [
                        { required: true, message: "Please input your mobile number" },
                        { min: 8, message: "Invalid Singapore mobile number" },
                        { max: 8, message: "Invalid Singapore mobile number" },
                      ] })(
                        <Input placeholder="Mobile" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}/> )}
                      </Form.Item>
                    </>
                  ) : ( <p>{ authenticated ? mobile : "______"}</p>)
                }
              </Form>
            </div>
          </div>
        </Spin>
        <div className="profile__stats-cont">
          <div className="profile__stat profile__stat--book-collections" onClick={()=>{history.push('/app/collections');}}>
            <div>
              <BookCollections/>
              <span>
                { loading
                  ? <Icon type="loading" />
                  : (collections ? collections.length : 0)
                }
              </span>
            </div>
            <p>Collections</p>
          </div>
          <div className="profile__stat profile__stat--book-donations" onClick={()=>{history.push('/app/donations');}}>
            <div>
              <DonationExchange/>
              <span>
                { loading
                  ? <Icon type="loading" />
                  : (donations ? donations.length : 0)
                }
              </span>
            </div>
            <p>Donations</p>
          </div>
          <div className="profile__stat profile__stat--book-voluntary" onClick={()=>{history.push('/app/voluntary');}}>
            <div>
              <VoluntaryDelivery/>
              <span>
                { loading
                  ? <Icon type="loading" />
                  : (voluntaries ? voluntaries.length : 0)
                }
              </span>
            </div>
            <p>Voluntaries</p>
          </div>
        </div>
      </div>
    </>
  )
}

ProfileEdit.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
  // classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  updateUser
};

const WrappedProfileEdit = Form.create()(ProfileEdit);

export default connect(mapStateToProps, mapActionsToProps)(WrappedProfileEdit);
