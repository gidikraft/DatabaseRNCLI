import axios from 'axios';
export const SET_USER_NAME = 'SET_USER_NAME';
export const GET_NEWS = 'GET_NEWS';
export const INCRESE_PAGE = 'INCRESE_PAGE';

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E250&page=1'

export const getNews = () => {
    try {
        return async dispatch => {
            const response = await axios.get(API_URL)

            if (response.status === 200) {
                dispatch({
                    type: GET_NEWS,
                    payload: response.data.hits
                })
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

export const increasePage = page => dispatch =>  {
    dispatch({
        type: INCRESE_PAGE,
        payload: page,
    })
};
