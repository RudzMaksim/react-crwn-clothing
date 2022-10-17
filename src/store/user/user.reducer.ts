import { USER_ACTION_TYPES } from "./user.action";
import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.store.utils";

type UserState = {
    currentUser: UserData | null,
    isLoading: boolean,
    error: Error | null
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case USER_ACTION_TYPES.SIGN_UP_FAILURE:
        case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}

