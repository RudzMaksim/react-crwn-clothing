import { CATEGORY_ACTION_TYPES } from "./category.action";

const INITIAL_STATE = {
    categories: []
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    if (type === CATEGORY_ACTION_TYPES.SET_CATEGORIES) {
        return {
            ...state,
            categories: payload
        }
    }
    else {
        return state;
    }
}