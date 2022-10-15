import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"; // allow us to get shop.component value as object
import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import {CategoryContainer, CategoryTitle} from "./category.styles"

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);

    const [products, setProducts] = useState(categoriesMap[category]);

    // whenever category or categoriesMap changes then setProducts (product update), otherwise no re-rendering
    useEffect( () => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
            {/* only render products.map if products has a value */}
            {products && 
                products.map( (product) => <ProductCard key={product.id} product={product}/>)
            }
        </CategoryContainer>
        </Fragment>
    )
}

export default Category