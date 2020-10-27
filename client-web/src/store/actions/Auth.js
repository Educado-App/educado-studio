import axios from 'axios';

// Fetch user action
export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data});
    }
};