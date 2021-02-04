import {FETCH_USER} from '../actions/Auth';
import axios from 'axios';

const initialState = {
    loginStatus: 'what',
}

const reducer = (state = initialState, action ) => {
    //typeof maybeObject != "undefined"
    switch (action.type) {
        case FETCH_USER:

            if (typeof action.payload === 'object') {
                return {
                    ...state,
                    loginStatus: true,
                }
            } else {
                return {
                    ...state,
                    loginStatus: false,
                }
            }
            
        default:
            return {
                ...state,
            }
    }
};

export default reducer;