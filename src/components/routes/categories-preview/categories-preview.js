import { Fragment } from "react";
import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { categoriesLoadingSelector, categoriesSelector } from "../../../store/categories/category.selector";
import Spinner from "../../spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesSelector);
    const isLoading = useSelector(categoriesLoadingSelector);
    return (
        <Fragment>
            {
                isLoading ? <Spinner/> :
                    Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title];
                        return <CategoryPreview key={title} title={title} products={products}/>
                    })
            }
        </Fragment>
    )
}

export default CategoriesPreview