import { ActionWithPayload, createAction } from "../../utils/reducer/reducer.util";
import { AdditionalInformation, UserData } from "../../utils/firebase/firebase.store.utils";
import { Action } from "redux";
import { User } from "firebase/auth";

export enum USER_ACTION_TYPES {
    CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
    GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE = 'user/SIGN_IN_FAILURE',
    SIGN_UP_START = 'user/SIGN_UP_START',
    SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE',
    SIGN_OUT_START = 'user/SIGN_OUT_START',
    SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE = 'user/SIGN_OUT_FAILURE'
}

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    { email: string; password: string }
    >;

export type SignInSuccess = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    UserData
    >;

export type SignInFailure = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_IN_FAILURE,
    Error
    >;

export type SignUpStart = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_START,
    { email: string; password: string; displayName: string }
    >;

export type SignUpSuccess = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    { user: User; additionalDetails: AdditionalInformation }
    >;

export type SignUpFailure = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_FAILURE,
    Error
    >;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailure = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_OUT_FAILURE,
    Error
    >;

export const checkUserSession = (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
    email,
    password
});

export const signInSuccess = (user: UserData & { id: string}): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error: Error): SignInFailure => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (email: string, password: string, displayName: string): SignUpStart => createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName
});

export const signUpSuccess = (user: User, additionalDetails: AdditionalInformation): SignUpSuccess => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    user,
    additionalDetails
})

export const signUpFailure = (error: Error): SignUpFailure => createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error)

export const signOutStart = (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)

export const signOutSuccess = (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)

export const signOutFailure = (error: Error): SignOutFailure => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error);