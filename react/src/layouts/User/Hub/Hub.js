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
          {/* <Actions /> */}
          <VoluntaryDelivery className="hub__delivery-btn"/>
          <BookCollections className="hub__collection-btn"/>
          <DonationExchange className="hub__donation-btn"/>
        </div>
      </>
    );
  }
}

export default Hub;
