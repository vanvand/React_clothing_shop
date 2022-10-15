// step 01 pasted in code from shop.component.jsx

import { useContext, Fragment } from "react";

// instead of fetching data from file directly we use CategoriesContext 
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {

    const {categoriesMap} = useContext(CategoriesContext)

    return (
        <Fragment>
            {/* Object.keys give back an array of key values (hats, jackets, ..) */}
            {Object.keys(categoriesMap).map( (title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products}/>
            })}
        </Fragment>
    );
};

export default CategoriesPreview
    