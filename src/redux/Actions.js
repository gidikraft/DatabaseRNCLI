import axios from 'axios';
export const SET_USER_NAME = 'SET_USER_NAME';
export const GET_NEWS = 'GET_NEWS'

// const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E250&page=1'
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export const getNews = () => {
    try {
        // return async dispatch => {
        //     const response = await axios.get(API_URL)

        //     if (response.status === 200) {
        //         dispatch({
        //             type: GET_NEWS,
        //             payload: response.data.hits
        //         })
        //     }
        // }
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const json = await result.json()
            if (json) {
                dispatch({
                    type: GET_NEWS,
                    payload: json
                });
            } else {
                console.log("Error fetching News")
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