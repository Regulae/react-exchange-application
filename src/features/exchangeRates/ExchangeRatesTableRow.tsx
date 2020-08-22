import React from 'react';

interface TableRowProps {
    currency: string,
    rate: number,
    valueToConvert: number
}

export default function ExchangeRatesTableRow({currency, rate, valueToConvert}: TableRowProps) {
    const convertedValue = valueToConvert * rate;

    if (valueToConvert === 0) {
        return (
            <div className={'row'}>
                <div className={'tableRow col-6'}>
                    <p>{currency}</p>
                </div>
                <div className={'tableRow col-6'}>
                    <p>{rate.toLocaleString()}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className={'row'}>
                <div className={'tableRow col-4'}>
                    <p>{currency}</p>
                </div>
                <div className={'tableRow col-4'}>
                    <p>{rate.toLocaleString()}</p>
                </div>
                <div className={'tableRow col-4'}>
                    <p>{convertedValue.toLocaleString()}</p>
                </div>
            </div>
        );
    }
}