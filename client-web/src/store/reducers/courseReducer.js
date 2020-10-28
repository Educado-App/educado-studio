import {CREATE_COURSE} from '../actions/Course';

const initialState = {
    course: {},
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case CREATE_COURSE:
            return {
                ...state,
                course: action.payload,
            }
            
        default:
            return {
                ...state,
            }
    }
};

export default reducer;