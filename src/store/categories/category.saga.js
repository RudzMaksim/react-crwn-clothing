import { all, call, put, takeLatest } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.store.utils";
import { CATEGORY_ACTION_TYPES } from "./category.action";
import { createAction } from "../../utils/reducer/reducer.util";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray))
    }
    catch (error) {
        yield put(fetchCategoriesError(error))
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}

const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)

const fetchCategoriesError = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);