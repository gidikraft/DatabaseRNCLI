import { SET_USER_NAME, GET_NEWS, SET_PAGE, INCRESE_PAGE } from "./actions";

const initialState = {
    name: "",
    news: [],
    page: 0,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME: 
            return { ...state, name: action.payload }
        case GET_NEWS:
            return { ...state, news: action.payload}
        case SET_PAGE: 
            return { ...state, page: action.payload }
        case INCRESE_PAGE:
            return { ...state, page: state.page + 1}
        default:
            return state;
    }
}

export default userReducer;
