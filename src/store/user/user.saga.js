import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
    signInFailure,
    signInSuccess, signOutFailed,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
    USER_ACTION_TYPES
} from "./user.action";
import {
    getCurrentUser,
    signInWithEmail,
    signInWithGooglePopup,
    signOutUser, signUpWithCreds
} from "../../utils/firebase/firebase.auth.utils";
import { createUserDocument } from "../../utils/firebase/firebase.store.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocument, userAuth, additionalDetails)
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

//SIGN IN
export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup)
        console.log(user);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmailAndPassword({payload}) {
    try {
        const {user} = yield call(signInWithEmail, payload.email, payload.password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

//SIGN UP
export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield call(signUpWithCreds, email, password);
        yield put(signUpSuccess(user, {displayName}))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload}) {
    const {user, additionalDetails} = payload;
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

//SIGN OUT
export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

//LISTENERS
export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}


export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}