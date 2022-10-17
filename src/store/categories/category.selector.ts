import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "../../interfaces/category";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const categoriesSelector = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as CategoryMap)
);

export const categoriesLoadingSelector = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)