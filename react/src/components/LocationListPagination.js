import React from 'react'

import { 
  Highlight, 
  connectHits, 
} from 'react-instantsearch-dom';

import { 
  List, 
  // Skeleton 
} from 'antd';
import "./LocationListPagination.css"

const LocationListPagination = connectHits(({ hits, selectedHit, onHitOver, mapView }) => (
  <List
    className="locationlistpagination__container"
    grid={ mapView
      ? ({
        gutter: 16
      }) : ({
        gutter: 16,
        xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3
      })
    }

    dataSource={hits}
    renderItem={item => {
      const classNames = [
        'hit',
        'hit--airbnb',
        selectedHit && selectedHit.objectID === item.objectID
          ? 'hit--airbnb-active'
          : '',
      ];
      return (
        <List.Item 
          key={item.objectID}
          className={classNames.join(' ').trim()}
          onMouseEnter={() => onHitOver(item)}
          onMouseLeave={() => onHitOver(null)}
        >
          {/* <Skeleton title={true} loading={item.loading} active> */}
            <div className="list-item__left-corner">
              <p>{item.donationIds.length > -1 ? item.donationIds.length : 0}</p>
              <div>
                <p>BOOKS</p>
                <span>to deliver</span>
              </div>
            </div>

            <p className="list-item__distanceAway">
              {item.distanceAway ? `${item.distanceAway} m away` : ''}
            </p>
            <p className="list-item__locName">
              {/* {item.locName ? item.locName : "Unknown"} */}
              <Highlight attribute="name" hit={item} />
            </p>
          {/* </Skeleton> */}
        </List.Item>
      )}
    }
  />
));

export default LocationListPagination
