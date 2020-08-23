import React, {useEffect, useState} from 'react';
import {setNewValueToConvert} from '../exchangeRateSlice';
import {useDispatch} from 'react-redux';

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
        <div className={'row'}>
            <input type={'number'} placeholder={'Value to convert'} value={valueToConvert}
                   onChange={onValueToConvertChanged}/>
        </div>
    );
}