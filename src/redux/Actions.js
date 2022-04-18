import axios from 'axios';
export const SET_USER_NAME = 'SET_USER_NAME';
export const GET_NEWS = 'GET_NEWS';
export const SET_PAGE = 'SET_PAGE';
export const SET_PASSWORD = 'SET_PAGE';
export const INCRESE_PAGE = 'INCRESE_PAGE';

const API_URL = `https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E150&page=0`

export const getNews = () => {
    try {
        return async dispatch => {
            const response = await axios.get(API_URL)

            if (response.status === 200) {
                dispatch({
                    type: GET_NEWS,
                    payload: response.data.hits
                })
            } else {
                console.log(`Couldn't get News from the server`)
            }
        }
    } catch (error) {
        console.log(error)
    }
};

export const setName = name => dispatch =>  {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    })
};

export const setAge = page => dispatch =>  {
    dispatch({
        type: SET_PAGE,
        payload: page,
    })
}

export const increasePage = page => dispatch =>  {
    dispatch({
        type: INCRESE_PAGE,
        payload: page,
    })
};

export const setPassword = password => dispatch =>  {
    dispatch({
        type: SET_PASSWORD,
        payload: password,
    })
}
