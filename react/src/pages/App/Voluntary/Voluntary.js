import React, { Fragment, useState } from 'react'
import Profile from "components/Profile"
import LocationListPagination from "components/LocationListPagination"
import algoliasearch from 'algoliasearch/lite';
import { 
  InstantSearch, 
  Configure, 
  Pagination, 
  connectStateResults, 
} from 'react-instantsearch-dom';
import { 
  GoogleMapsLoader, 
  GeoSearch, 
  Control, 
  CustomMarker 
} from 'react-instantsearch-dom-maps';
// import FilterColumn from "components/FilterColumn"

import { 
  Typography, 
  Switch, 
  Icon, 
  // List 
} from "antd";
import "./Voluntary.css"
import "components/LocationListPagination.css"

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);


const Voluntary = () => {
  const [mapView, toggleMapView] = useState(true);
  const [selectedHit, setSelectedHit] = useState(null);

  const onHitOver = hit => setSelectedHit(hit);

  const renderGeoHit = hit => {

    const classNames = [
      'my-custom-marker',
      selectedHit && selectedHit.objectID === hit.objectID
        ? 'my-custom-marker--active'
        : '',
    ];

    return (
      <CustomMarker
        key={hit.objectID}
        hit={hit}
        anchor={{ x: 0, y: 5 }}
        onMouseEnter={() => onHitOver(hit)}
        onMouseLeave={() => onHitOver(null)}
      >
        <div className={classNames.join(' ').trim()}>
          <span>{hit.name} 
            <center>{`${hit.donationIds.length} Books`}<br/></center> 
          </span>
        </div>
      </CustomMarker>
    );
  };
  
  return (
    <div className="voluntary__container">
      <Profile/>
      <div className="voluntary__header">
        <Typography.Title level={2}>Book delivery requests</Typography.Title>
        <div className="voluntary__viewToggle">
          <Switch className="voluntary__viewToggle--switch"
            checkedChildren={<Icon type="environment"/>}
            unCheckedChildren={<Icon type="menu"/>}
            onChange={() => {toggleMapView(!mapView)}}
            defaultChecked
          />
          <span className="voluntary__viewToggle--label">{mapView ? "Map View" : "List View"}</span>
        </div>
      </div>
      <div className="voluntary__deposit-sites">
        <InstantSearch indexName="deposits" searchClient={searchClient}>
        <Configure aroundLatLngViaIP hitsPerPage={20} />
        {/* <Configure hitsPerPage={20} aroundRadius={5000}/> */}
        <div className="voluntary__deposit-sites--list">
          <Results>
            <LocationListPagination selectedHit={selectedHit} onHitOver={onHitOver} mapView={mapView}/>
            <Pagination />
          </Results>
        </div>
        { mapView 
          ? (<div className="voluntary__deposit-sites--map">
              <GoogleMapsLoader apiKey={process.env.REACT_APP_GOOGLE_MAP_BROWSER_API}>
                {google => (
                  <GeoSearch google={google}>
                    {({ hits }) => (
                      <Fragment>
                        <Control />
                        {hits.map(renderGeoHit)}
                      </Fragment>
                    )}
                  </GeoSearch>
                )}
              </GoogleMapsLoader>
            </div>) 
          : null
        }
          
        </InstantSearch>
      </div>
      {/* <FilterColumn filterType={["number of books", "distance", "alphabetical"]}/> */}
    </div>
  )
}

export default Voluntary;

const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
      <div>No results have been found for {searchState.query}.</div>
    )
);