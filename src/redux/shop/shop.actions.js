import { ShopActionTypes } from './shop.types';
import { convertCollectionsSnapshotToMap, firestore } from '../../core/firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsError = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_ERROR,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef.get()
        .then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => {
            dispatch(fetchCollectionsError(error.message));
        });
};


