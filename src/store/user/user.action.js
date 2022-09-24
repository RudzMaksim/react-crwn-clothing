import { createAction } from "../../utils/reducer/reducer.util";

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'user/SET_CURRENT_USER'
}
