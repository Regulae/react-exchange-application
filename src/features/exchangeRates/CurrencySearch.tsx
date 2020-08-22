import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchCurrency} from './exchangeRateSlice';

export default function CurrencySearch() {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const onSearchTextChanged = (e: { target: HTMLInputElement }) => {
        setSearchText(e.target.value,);
    };

    useEffect(() => {
        dispatch(searchCurrency(searchText));
    });

    return (
        <div className={'row'}>
            <input type={'text'} value={searchText} onChange={onSearchTextChanged}/>
        </div>
    );
}