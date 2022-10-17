import { all, call, put, takeLatest } from 'typed-redux-saga/macro'

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.store.utils";
import { CATEGORY_ACTION_TYPES, fetchCategoriesError, fetchCategoriesSuccess } from "./category.action";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);

        yield* put(fetchCategoriesSuccess(categoriesArray))
    }
    catch (error) {
        yield* put(fetchCategoriesError(error as Error))
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}