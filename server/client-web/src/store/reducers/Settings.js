import * as actionTypes from '../actions/Settings';

const initialState = {
    organisation: 'National Bank of Brazil',
    language: 'Portuguise',
    languages: [
        {
            name: 'English',
        },
        {
            name: 'Portuguise',
        },
    ]
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.CHANGE_ORGANISATION:
            return {
                ...state,
                organisation: action.name
            }
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language
            }
    }
    return state;
};

export default reducer;