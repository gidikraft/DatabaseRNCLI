import { SET_USER_NAME, GET_NEWS } from "./actions";

const initialState = {
    name: "",
    news: [],
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME: 
            return { ...state, name: action.payload }
        case GET_NEWS:
            return { ...state, news: action.payload}
        default:
            return state;
    }
}

export default userReducer;
