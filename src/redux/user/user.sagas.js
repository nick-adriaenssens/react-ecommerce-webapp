import { takeLatest, put, all, call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from './user.actions';
import { auth, createUserProfileDoc, getCurrentUser, googleAuthProvider } from '../../core/firebase/firebase.utils';

export function* getSnapshotFromUser(user, additionalData) {
    try {
        const userRef = yield call(createUserProfileDoc, user, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleAuthProvider);
        yield getSnapshotFromUser(user);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUser(user);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* isUserAuthenticated() {
    try {
        const user = yield getCurrentUser();
        if (!user) return;
        yield getSnapshotFromUser(user);
    } catch (e) {
        yield put(signInFailure(e));
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (e) {
        yield put(signOutFailure(e));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (e) {
        yield put(signUpFailure(e));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUser(user, additionalData);
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}