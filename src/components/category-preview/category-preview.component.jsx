import ProductCard from "../product-card/product-card.component";

import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles";

const CategoryPreview = ( {title, products }) => {
    return (
        <CategoryPreviewContainer>

            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>

            <Preview>
                {products
                    // filter out everything, but the first four 
                    // _ means I want to ignore the first argument
                    .filter( (_, idx) => idx < 4) 
                    // then map through filtered products
                    .map( (product) => (
                    <ProductCard key={product.id} product={product}/>
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview 