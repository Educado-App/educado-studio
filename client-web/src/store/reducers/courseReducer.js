import {CREATE_COURSE,GET_ALL_COURSES,EDIT_COURSE} from '../actions/Course';

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
        
        case EDIT_COURSE:
            return {
                ...state,
                activeCourse: state.userCourses.find(obj => {
                    return obj._id === action.payload
                })
            }
        
            
        default:
            return {
                ...state,
            }
    }
};

export default reducer;