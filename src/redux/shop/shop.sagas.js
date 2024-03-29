import { takeLatest, call, put, all } from 'redux-saga/effects';
import { ShopActionTypes } from './shop.types';
import { convertCollectionsSnapshotToMap, firestore } from '../../core/firebase/firebase.utils';
import { fetchCollectionsError, fetchCollectionsSuccess } from './shop.actions';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (e) {
        yield put(fetchCollectionsError(e));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}