import React, { Component } from 'react';

import "./Hub.css";
//[^fgs][\w-]+="[^cl][\w\d\-_ ]+" rename linear-gradient clip-path
import { ReactComponent as Profile } from "./assets/profile.svg";
// import { ReactComponent as Actions } from "./assets/actions.svg";
import { ReactComponent as DonationExchange } from "./assets/donation-exchange.svg";
import { ReactComponent as BookCollections } from "./assets/book-collections.svg";
import { ReactComponent as VoluntaryDelivery } from "./assets/voluntary-delivery.svg";

class Hub extends Component {
  render() {
    return (
      <>
        <div className="hub__user-cont">
          <Profile className="hub__profile"/>
          Hey Ben!
        </div>
        <p className="hub__hook">Ready for your "bookenture"?</p>
        <div className="hub__actions">
          <div className="hub__voluntary-btn" onClick={()=>{this.props.history.push('/app/voluntary');}}>
            <VoluntaryDelivery/>
            <p>Deliver books</p>
            <span>Voluntary</span>
          </div>
          <div className="hub__collection-btn" onClick={()=>{this.props.history.push('/app/collections');}}>
            <BookCollections/>
            <p>Browse book</p>
            <span>Collections</span>
          </div>
          <div className="hub__donation-btn" onClick={()=>{this.props.history.push('/app/donations');}}>
            <DonationExchange className="hub__donation-btn--svg"/>
            <p>View exchanged</p>
            <span>Donations</span>
          </div>
        </div>
      </>
    );
  }
}

export default Hub;
