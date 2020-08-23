import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchCurrency, showHideButton} from '../exchangeRateSlice';

export default function CurrencySearch() {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const onSearchTextChanged = (e: { target: HTMLInputElement }) => {
        setSearchText(e.target.value);
        dispatch(showHideButton(false));
    };

    useEffect(() => {
        dispatch(searchCurrency(searchText));
    }, [dispatch, searchText]);

    return (
        <div className={'row'}>
            <input type={'text'} placeholder={'Search'} value={searchText} onChange={onSearchTextChanged}/>
        </div>
    );
}