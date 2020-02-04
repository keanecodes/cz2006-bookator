import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  connectRefinementList,
  connectCurrentRefinements,
  Configure,
} from 'react-instantsearch-dom';

import Profile from "components/Profile";

import { Typography, Empty, Tag, Checkbox } from "antd";
import "./Collections.css"

// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

const Collections = () => {
  const [selectedFilter, setSelectedFilter] = useState([])
  const updateSelectedFilter = selected => { setSelectedFilter(selected)}

  const [refresh, toggleRefresh] = useState(false);

  useEffect(() => {
    toggleRefresh(refresh => !refresh);
  }, [])

  return (
    <div className="collections__container ais-InstantSearch">
      <InstantSearch 
        indexName="donations" 
        searchClient={searchClient}
        refresh={refresh}
      >
        
        <div className="booklistpagination__container">
          <SearchBox 
            translations={{
              placeholder: 'Search books by title, author, etc...',
            }}
            submit={null}
            reset={null}
          />
          <Typography.Title level={2}>New Donation Uploads</Typography.Title>
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
        <div className="filter-column__container">
          <Profile/>
          <div className="filter-column__title">
            <h2>Filter</h2>
            <CustomClearRefinements 
              clearStateFilter={() => {
                setSelectedFilter([])
                console.log(selectedFilter);
              }}
            />
          </div>
          {/* <p>By title</p>
          <RefinementList attribute="title" limit={3} showMore={true} showMoreLimit={5}/> */}
          <p>By author</p>
          <CustomRefinementList attribute="author" limit={3} showMore={true} showMoreLimit={5} selected={selectedFilter} parentPassSelected={updateSelectedFilter}/>
          <p>By genre</p>
          <CustomRefinementList attribute="tag" limit={3} showMore={true} showMoreLimit={5} selected={selectedFilter} parentPassSelected={updateSelectedFilter}/>
          {/* TODO: Change to collection point later */}
          <p>By collection point</p>
          <CustomRefinementList attribute="depositPoint" limit={3} showMore={true} showMoreLimit={5} selected={selectedFilter} parentPassSelected={updateSelectedFilter}/>
          
          <Configure hitsPerPage={9} />
        </div>
      </InstantSearch>
    </div>
  )
  
}

function Hit(props) {
  const item = props.hit;

  return (
    <div className="list-item" >
      {item.img ? (
        <img className="list-item__img" alt="logo" src={item.img} />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <div className="list-item__title">
        {item.title 
          ? <Highlight attribute="title" hit={item} />
          : "Untitled"
        }
      </div>
      <div className="list-item__author">
        {item.author 
          ? <Highlight attribute="author" hit={item} />
          : "Unknown"
        }
      </div>
      {["Fiction"].includes(item.tag)
        ? (<Tag className="list-item__tag" color="cyan">{item.tag}</Tag>)
        : item.status === "Pending"
          ? (<Tag className="list-item__tag" color="yellow">{item.status}</Tag>)
          : item.status === "Deposited"
          ? (<Tag className="list-item__tag" color="purple">{item.status}</Tag>)
          : item.status === "Donated"
            ? (<Tag className="list-item__tag" color="cyan">{item.status}</Tag>)
            : (<Tag className="list-item__tag" color="red">{item.status}</Tag>)
      }
    </div>
  );
}

const RefinementList = ({ items, refine, selected, parentPassSelected }) => (
  <Checkbox.Group value={selected}>
    {items.map(item => (
      <div key={`filter-checkbox${item.label}`}>
        <Checkbox 
          value={item.label}
          onClick={e => {
            e.preventDefault();
            refine(item.value);
            selected.includes(item.label)
              ? selected.pop(item.label)
              : selected.push(item.label);
            parentPassSelected(selected)
          }}
        >
          {item.label} ({item.count})
        </Checkbox>
        <br/>
      </div>
    ))}
  </Checkbox.Group>
);

const CustomRefinementList = connectRefinementList(RefinementList);

const ClearRefinements = ({ items, refine, clearStateFilter }) => (
  <button 
    className={`ais-ClearRefinements-button ${!items.length ? "ais-ClearRefinements-button--disabled" : null}`}
    onClick={() => { refine(items); clearStateFilter(); }}
    disabled={!items.length}
  >
    Clear
  </button>
);

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Collections
