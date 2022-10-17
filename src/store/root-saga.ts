import { all } from 'typed-redux-saga/macro'
import { categoriesSaga } from "./categories/category.saga";
import { userSaga } from "./user/user.saga";

export function* rootSaga() {
    yield* all([categoriesSaga(), userSaga()])
}