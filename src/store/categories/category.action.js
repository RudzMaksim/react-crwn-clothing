import { createAction } from "../../utils/reducer/reducer.util";

export const CATEGORY_ACTION_TYPES = {
    SET_CATEGORIES: 'category/SET_CATEGORIES',
    FETCH_CATEGORIES_START: 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS: 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED: 'category/FETCH_CATEGORIES_FAILED'
}

export const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);