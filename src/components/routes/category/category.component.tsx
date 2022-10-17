import './category.styles.scss'
import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import ProductCard from "../../product-card/product-card.component";
import { useSelector } from "react-redux";
import { categoriesLoadingSelector, categoriesSelector } from "../../../store/categories/category.selector";
import Spinner from "../../spinner/spinner.component";

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(categoriesSelector);
    const isLoading = useSelector(categoriesLoadingSelector);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? <Spinner/> :
                <div className='category-container'>
                    {
                        products && products.map(product => <ProductCard key={product.id} product={product}/>)
                    }
                </div>
            }
        </Fragment>
    )
}

export default Category;