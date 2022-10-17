import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.util";
import { Category } from "../../interfaces/category";
import { Action } from "redux";

export enum CATEGORY_ACTION_TYPES {
    FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED'
}

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesError = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesError = withMatcher((error: Error): FetchCategoriesError => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));