import axios from 'axios';

// Fetch user action
export const CREATE_COURSE = 'CREATE_COURSE';

export const createCourse = (title,description) => {
    const course = {
        title: title,
        description: description
    }
    return async (dispatch) => {
        const res = await axios.post('/api/create/course',course);
        dispatch({ type: CREATE_COURSE, payload: res.data});
    }
};