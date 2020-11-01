import {CREATE_COURSE,GET_ALL_COURSES} from '../actions/Course';

const initialState = {
    activeCourse: {},
    userCourses: [{}],
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case CREATE_COURSE:
            return {
                ...state,
                activeCourse: action.payload,
            }

        case GET_ALL_COURSES:
            return {
                ...state,
                userCourses: action.payload
            }

        
            
        default:
            return {
                ...state,
            }
    }
};

export default reducer;