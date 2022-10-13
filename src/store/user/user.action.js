import { createAction } from "../../utils/reducer/reducer.util";

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'user/SET_CURRENT_USER',
    CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
    GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE',
    SIGN_UP_START: 'user/SIGN_UP_START',
    SIGN_UP_SUCCESS: 'user/SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'user/SIGN_UP_FAILURE',
    SIGN_OUT_START: 'user/SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'user/SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'user/SIGN_OUT_FAILURE'
}

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password
});

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName
});

export const signUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails
})

export const signUpFailure = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error)

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START)

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)

export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);