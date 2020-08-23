import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import ExchangeRatesTableRow from './ExchangeRatesTableRow';
import {Button} from 'react-bootstrap';
import CurrencySearch from './CurrencySearch';
import {fetchExchangeRates, showHideButton, SliceState} from './exchangeRateSlice';
import ConvertValue from './ConvertValue';

export default function ExchangeRatesTable() {
    const [numberOfRowsShown, setNumberOfRowsShown] = useState(5);
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.exchangeRates.status);
    const success = useSelector((state: RootState) => state.exchangeRates.exchangeRates.success);
    const error = useSelector((state: RootState) => state.exchangeRates.exchangeRates.error);
    const exchangeRates = useSelector((state: RootState) => state.exchangeRates.exchangeRates.rates);
    const showButton = useSelector((state: RootState) => state.exchangeRates.showButton);
    const searchText = useSelector((state: RootState) => state.exchangeRates.searchText);
    const valueToConvert = useSelector((state: RootState) => state.exchangeRates.valueToConvert);
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExchangeRates({}))
        }
    }, [status, dispatch])

    let tableRows;
    if(success){
        let filteredCurrencies = Object.keys(exchangeRates);
        if (searchText.length) {
            filteredCurrencies = filteredCurrencies.filter(key => key.indexOf(searchText.toUpperCase()) > -1);
        } else {
            filteredCurrencies = filteredCurrencies.slice(0, numberOfRowsShown);
        }
        tableRows = filteredCurrencies.map(currency =>
            <ExchangeRatesTableRow key={currency} currency={currency} valueToConvert={valueToConvert}
                                   rate={exchangeRates[currency]}/>
        );

    const showMore = () => {
        if (numberOfRowsShown + 5 <= Object.keys(exchangeRates).length) {
            setNumberOfRowsShown(numberOfRowsShown + 5);
        } else {
            setNumberOfRowsShown(Object.keys(exchangeRates).length);
            dispatch(showHideButton(false));
        }
    };

    const buttonMore = showButton ? (
        <div className={'d-flex justify-content-center'}>
            <Button type={'button'} variant={'outline-primary'} onClick={showMore}>
                Show More
            </Button>
        </div>
    ) : null;
    const convertedValue = valueToConvert > 0 ?
        <div className={'tableHeader col'}>
            <h2>Converted Value</h2>
        </div> : null;

    return (
        <div className={'container'}>
            <CurrencySearch/>
            <ConvertValue/>
            <div className={'row'}>
                <div className={'tableHeader col'}>
                    <h2>Currency</h2>
                </div>
                <div className={'tableHeader col'}>
                    <h2>Exchange Rate</h2>
                </div>
                {convertedValue}
            </div>
            {tableRows}
            {buttonMore}
        </div>
    );
    } else {
        const errorMessage = <p>{error.code} {error.type} {error.info}</p>;

        return(
            <div>{errorMessage}</div>
        )
    }
}