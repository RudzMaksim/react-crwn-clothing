import { Fragment } from "react";
import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../../../store/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesSelector);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}/>
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview