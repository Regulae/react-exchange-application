import reducer from './exchangeRateSlice';
import * as types from './exchangeRateSlice';
import {initialState} from './exchangeRateSlice';

describe('exchangeRates reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual(
            initialState
        );
    });

    it('should handle searchCurrency', () => {
        expect(
            reducer(initialState, {
                type: types.searchCurrency,
                payload: 'sd'
            })
        ).toEqual({
                ...initialState,
                searchText: 'sd'
            }
        );
    });

    it('should handle showHideButton', () => {
        expect(
            reducer(initialState, {
                type: types.showHideButton,
                payload: false
            })
        ).toEqual({
            ...initialState,
            showButton: false
        });
        expect(
            reducer({...initialState, showButton: false}, {
                type: types.showHideButton,
                payload: true
            })
        ).toEqual({
            ...initialState,
            showButton: true
        });
    });

    it('should handle setNewValueToConvert', () => {
        expect(
            reducer(initialState, {
                type: types.setNewValueToConvert,
                payload: 11
            })
        ).toEqual({
            ...initialState,
            valueToConvert: 11
        })
    })
});