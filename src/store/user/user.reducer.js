import { USER_ACTION_TYPES } from "./user.action";

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    if (type === USER_ACTION_TYPES.SET_CURRENT_USER) {
        return {
            currentUser: payload
        }
    } else {
        return state;
    }
}

