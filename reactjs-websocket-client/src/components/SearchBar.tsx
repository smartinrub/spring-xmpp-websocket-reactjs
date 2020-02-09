import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

export type SearchBarProps = {};

const SearchBar: FC<SearchBarProps> = () => {
  return (
    <div className="headind-srch">
      <div className="srch-bar">
        <div className="stylish-input-group">
          <input type="text" className="search-bar" placeholder="Search" />
          <span className="input-group-addon">
            <Button type="button">
              {' '}
              <i className="fa fa-search" aria-hidden="true"></i>{' '}
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
