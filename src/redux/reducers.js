import { SET_USER_NAME, GET_NEWS, SET_PAGE, INCRESE_PAGE, SET_PASSWORD } from "./actions";

const initialState = {
    name: "",
    password: "",
    news: [],
    page: 0,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME: 
            return { ...state, name: action.payload }
        case SET_PASSWORD: 
            return { ...state, password: action.payload }
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
