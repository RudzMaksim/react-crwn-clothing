import { createAction } from "../../utils/reducer/reducer.util";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.store.utils";

export const CATEGORY_ACTION_TYPES = {
    SET_CATEGORIES: 'category/SET_CATEGORIES',
    FETCH_CATEGORIES_START: 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS: 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED: 'category/FETCH_CATEGORIES_FAILED'
}

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }
    catch (error) {
        dispatch(fetchCategoriesError())
    }
}

const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)

const fetchCategoriesError = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);