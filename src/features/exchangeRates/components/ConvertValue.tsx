import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {setNewValueToConvert} from '../exchangeRateSlice';

export default function ConvertValue() {
    const [valueToConvert, setValueToVConvert] = useState(0);
    const dispatch = useDispatch();

    const onValueToConvertChanged = (e: { target: HTMLInputElement }) => {
        setValueToVConvert(Number(e.target.value));
    };

    useEffect(() => {
        dispatch(setNewValueToConvert(valueToConvert));
    }, [dispatch, valueToConvert]);

    return (
        <div className={'col'}>
            <label htmlFor={'convertValue'}>Value (in EUR): </label>
            <input type={'number'} placeholder={'Value to convert'} name={'convertValue'} value={valueToConvert}
                   onChange={onValueToConvertChanged}/>
        </div>
    );
}