'use client';
import './SearchBar.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Close from '@assets/icons/close.svg';
import Search from '@assets/icons/search.svg';
import { clearSearch, filterUsers, getCurrentSearchTerm } from '@store/slices/users';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(getCurrentSearchTerm);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterUsers(e.target.value));
    };

    const handleClear = () => {
        dispatch(clearSearch());
    };

    return (
        <div className="search-bar">
            <Search className="search-icon" />
            <input type="text" placeholder="Search users..." value={searchQuery} onChange={handleSearch} className="search-input" role="search" />
            {searchQuery && <Close className="clear-btn" onClick={handleClear} />}
        </div>
    );
};

export default SearchBar;
