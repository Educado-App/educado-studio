import {FETCH_USER} from '../actions/Auth';

const initialState = {
}

const reducer = (state = null, action ) => {

    console.log(action);

    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state
    }
};

export default reducer;