import { createAction } from "../../utils/reducer/reducer.util";

export const CATEGORY_ACTION_TYPES = {
    SET_CATEGORIES: 'category/SET_CATEGORIES'
}

export const setCategoriesMap = (categories) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories);