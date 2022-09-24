import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

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
    }, {})
);