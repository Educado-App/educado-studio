import axios from 'axios';

// Fetch user action
export const CREATE_COURSE = 'CREATE_COURSE';

export const createCourse = (title,description) => {
    const course = {
        title: title,
        description: description
    }
    return async (dispatch) => {
        const res = await axios.post('/api/course/create',course);
        dispatch({ type: CREATE_COURSE, payload: res.data});
    }
};


// Get all courses
export const GET_ALL_COURSES = 'GET_ALL_COURSES';

export const getAllCourses = () => {
    
    return async (dispatch) => {
        const res = await axios.get('/api/course/getall');
        console.log(res);
        dispatch({type: GET_ALL_COURSES, payload: res.data})
    }

}