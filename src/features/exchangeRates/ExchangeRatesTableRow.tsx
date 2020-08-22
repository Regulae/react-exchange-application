import React from 'react';

interface TableRowProps {
    currency: string,
    rate: number
}

export default function ExchangeRatesTableRow({currency, rate}: TableRowProps){
    return (
        <div className={'row'}>
            <div className={'tableRow col-6'}>
                <p>{currency}</p>
            </div>
            <div className={'tableRow col-6'}>
                <p>{rate.toLocaleString()}</p>
            </div>
        </div>
    )
}