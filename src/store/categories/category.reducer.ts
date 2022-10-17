import {
    fetchCategoriesError,
    fetchCategoriesStart,
    fetchCategoriesSuccess
} from "./category.action";
import { Category } from "../../interfaces/category";
import { AnyAction } from "redux";

export type CategoriesState = {
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null
}

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoryReducer = (state = INITIAL_STATE, action: AnyAction): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return {...state, isLoading: true}
    }

    if (fetchCategoriesSuccess.match(action)) {
        return {...state, categories: action.payload, isLoading: false};
    }

    if (fetchCategoriesError.match(action)) {
        return {...state, error: action.payload, isLoading: false}
    }

    return state;
}