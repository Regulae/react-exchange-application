import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Button} from 'react-bootstrap';

import {fetchExchangeRates, showHideButton} from './exchangeRateSlice';
import ExchangeRatesTableRow from './components/ExchangeRatesTableRow';
import CurrencySearch from './components/CurrencySearch';
import ConvertValue from './components/ConvertValue';

// Example state for testing without fetching information from api. To use import SliceState from '/.exchangeRateSlice'.
// const exampleState: SliceState = {
//     'status': 'succeeded',
//     'searchText': '',
//     'showButton': true,
//     'valueToConvert': 0,
//     exchangeRates: {
//         'success': true,
//         'timestamp': 1597907346,
//         'base': 'EUR',
//         'date': '2020-08-20',
//         'rates': {
//             'AED': 4.355252,
//             'AFN': 93.134367,
//             'ALL': 123.902241,
//             'AMD': 574.226752,
//             'ANG': 2.144743,
//             'AOA': 684.317831,
//             'ARS': 87.03656,
//             'AUD': 1.65129,
//             'AWG': 2.134231,
//             'AZN': 1.995808,
//             'BAM': 1.95757,
//             'BBD': 2.412485,
//             'BDT': 101.31407,
//             'BGN': 1.957798,
//             'BHD': 0.44702,
//             'BIF': 2304.887864,
//             'BMD': 1.185684,
//             'BND': 1.629376,
//             'BOB': 8.238224,
//             'BRL': 6.589912,
//             'BSD': 1.194882,
//             'BTC': 0.000101,
//             'BTN': 89.250245,
//             'BWP': 13.87727,
//             'BYN': 2.950873,
//             'BYR': 23239.407395,
//             'BZD': 2.408382,
//             'CAD': 1.567089,
//             'CDF': 2312.083611,
//             'CHF': 1.082862,
//             'CLF': 0.033706,
//             'CLP': 930.055013,
//             'CNY': 8.204819,
//             'COP': 4454.9114,
//             'CRC': 711.054097,
//             'CUC': 1.185684,
//             'CUP': 31.420627,
//             'CVE': 110.364977,
//             'CZK': 26.097216,
//             'DJF': 212.712679,
//             'DKK': 7.445491,
//             'DOP': 69.683122,
//             'DZD': 151.909935,
//             'EGP': 18.878701,
//             'ERN': 17.78486,
//             'ETB': 42.951907,
//             'EUR': 1,
//             'FJD': 2.528703,
//             'FKP': 0.906917,
//             'GBP': 0.90671,
//             'GEL': 3.664309,
//             'GGP': 0.906917,
//             'GHS': 6.894029,
//             'GIP': 0.906917,
//             'GMD': 61.40938,
//             'GNF': 11533.747583,
//             'GTQ': 9.200234,
//             'GYD': 249.773096,
//             'HKD': 9.18923,
//             'HNL': 29.460687,
//             'HRK': 7.529492,
//             'HTG': 134.232453,
//             'HUF': 349.156649,
//             'IDR': 17507.869978,
//             'ILS': 4.035582,
//             'IMP': 0.906917,
//             'INR': 88.911483,
//             'IQD': 1426.402101,
//             'IRR': 49923.227138,
//             'ISK': 161.904949,
//             'JEP': 0.906917,
//             'JMD': 179.803876,
//             'JOD': 0.84063,
//             'JPY': 125.67599,
//             'KES': 128.32693,
//             'KGS': 92.129074,
//             'KHR': 4884.983788,
//             'KMF': 489.628643,
//             'KPW': 1067.202187,
//             'KRW': 1407.11047,
//             'KWD': 0.362677,
//             'KYD': 0.995719,
//             'KZT': 500.321652,
//             'LAK': 10852.722587,
//             'LBP': 1806.836636,
//             'LKR': 222.419946,
//             'LRD': 236.315014,
//             'LSL': 20.571747,
//             'LTL': 3.501017,
//             'LVL': 0.717209,
//             'LYD': 1.634781,
//             'MAD': 10.951228,
//             'MDL': 19.828261,
//             'MGA': 4582.180714,
//             'MKD': 61.669822,
//             'MMK': 1627.062999,
//             'MNT': 3376.983388,
//             'MOP': 9.5379,
//             'MRO': 423.289383,
//             'MUR': 47.130792,
//             'MVR': 18.271846,
//             'MWK': 894.654325,
//             'MXN': 26.271914,
//             'MYR': 4.947269,
//             'MZN': 84.497765,
//             'NAD': 20.571379,
//             'NGN': 460.602822,
//             'NIO': 41.580665,
//             'NOK': 10.568956,
//             'NPR': 142.800344,
//             'NZD': 1.808026,
//             'OMR': 0.456548,
//             'PAB': 1.194762,
//             'PEN': 4.261889,
//             'PGK': 4.219022,
//             'PHP': 57.645591,
//             'PKR': 201.32927,
//             'PLN': 4.398592,
//             'PYG': 8299.417294,
//             'QAR': 4.317069,
//             'RON': 4.84044,
//             'RSD': 117.590208,
//             'RUB': 87.143628,
//             'RWF': 1153.965342,
//             'SAR': 4.446534,
//             'SBD': 9.800353,
//             'SCR': 20.425155,
//             'SDG': 65.57279,
//             'SEK': 10.32643,
//             'SGD': 1.624512,
//             'SHP': 0.906917,
//             'SLL': 11575.241829,
//             'SOS': 690.665716,
//             'SRD': 8.842793,
//             'STD': 25246.494316,
//             'SVC': 10.454646,
//             'SYP': 607.057268,
//             'SZL': 20.573837,
//             'THB': 37.195497,
//             'TJS': 12.327667,
//             'TMT': 4.161751,
//             'TND': 3.233951,
//             'TOP': 2.706146,
//             'TRY': 8.670931,
//             'TTD': 8.097772,
//             'TWD': 34.871445,
//             'TZS': 2753.158788,
//             'UAH': 32.708529,
//             'UGX': 4390.903367,
//             'USD': 1.185684,
//             'UYU': 51.061254,
//             'UZS': 12270.822635,
//             'VEF': 11.842015,
//             'VND': 27477.635035,
//             'VUV': 134.786293,
//             'WST': 3.101884,
//             'XAF': 656.551734,
//             'XAG': 0.043756,
//             'XAU': 0.000609,
//             'XCD': 3.20437,
//             'XDR': 0.843964,
//             'XOF': 656.551734,
//             'XPF': 119.637271,
//             'YER': 296.836102,
//             'ZAR': 20.426841,
//             'ZMK': 10672.580626,
//             'ZMW': 22.433021,
//             'ZWL': 381.790393
//         },
//         error: {
//             code: 101,
//             type: 'invalid-access-token',
//             info: 'blablablablalablaab'
//         }
//     }
// };

export default function ExchangeRatesTable() {
    const [numberOfRowsShown, setNumberOfRowsShown] = useState(5);
    const dispatch = useDispatch();

    // selectors
    const status = useSelector((state: RootState) => state.exchangeRates.status);
    const success = useSelector((state: RootState) => state.exchangeRates.exchangeRates.success);
    const error = useSelector((state: RootState) => state.exchangeRates.exchangeRates.error);
    const exchangeRates = useSelector((state: RootState) => state.exchangeRates.exchangeRates.rates);
    const showButton = useSelector((state: RootState) => state.exchangeRates.showButton);
    const searchText = useSelector((state: RootState) => state.exchangeRates.searchText);
    const valueToConvert = useSelector((state: RootState) => state.exchangeRates.valueToConvert);

    // fetch exchange rates when rendering
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExchangeRates({}));
        }
    }, [status, dispatch]);

    let tableRows;

    // when api call was successful, render table with currencies and exchange rates
    if (success) {

        // get all currencies from state and filter for searchText if one is given.
        let filteredCurrencies = Object.keys(exchangeRates);
        if (searchText.length) {
            filteredCurrencies = filteredCurrencies.filter(key => key.indexOf(searchText.toUpperCase().trim()) > -1);
        } else {
            filteredCurrencies = filteredCurrencies.slice(0, numberOfRowsShown);
        }
        tableRows = filteredCurrencies.map(currency =>
            <ExchangeRatesTableRow key={currency} currency={currency} valueToConvert={valueToConvert}
                                   rate={exchangeRates[currency]}/>
        );

        // show 5 more currencies when button is clicked
        const showMore = () => {
            if (numberOfRowsShown + 5 <= Object.keys(exchangeRates).length) {
                setNumberOfRowsShown(numberOfRowsShown + 5);
            } else {
                setNumberOfRowsShown(Object.keys(exchangeRates).length);
                dispatch(showHideButton(false));
            }
        };

        const buttonMore = showButton ? (
            <div className={'d-flex justify-content-start'}>
                <Button type={'button'} variant={'outline-primary'} onClick={showMore}>
                    Show More
                </Button>
            </div>
        ) : null;

        // add column for converted values
        const convertedValue = valueToConvert > 0 ?
            <div className={'tableHeader col'}>
                <h2>Converted Value</h2>
            </div> : null;

        return (
            <div className={'container'}>
                <h1>Exchange Rates Search and Converter</h1>
                <div className={'row input-row'}>
                    <CurrencySearch/>
                    <ConvertValue/>
                </div>
                <div className={'row'}>
                    <div className={'tableHeader col-4'}>
                        <h2>Currency</h2>
                    </div>
                    <div className={'tableHeader col-4'}>
                        <h2>Exchange Rate</h2>
                    </div>
                    {convertedValue}
                </div>
                {tableRows}
                {buttonMore}
            </div>
        );
    } else {
        // show error message
        const errorMessage = <div className={'alert alert-warning'}
                                  role={'alert'}>{error.code} {error.type} {error.info}</div>;

        return (
            <div>{errorMessage}</div>
        );
    }
}