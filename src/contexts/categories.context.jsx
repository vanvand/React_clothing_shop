// 01 import createContent method
import { createContext, useState, useEffect } from "react"

// get shop data
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// 02 import products > create variable
// import SHOP_DATA from "../shop-data.js"

// 03 initialize Context > Context value
export const CategoriesContext = createContext( {
    // we want to store an array of products
    categoriesMap: {},
} );

// 04 create component
// Context Provider where we pass in the children and render them between our ProductContext.Provider
export const CategoriesProvider = ( {children} ) => {
    const [ categoriesMap, setCategoriesMap ] = useState({});

    // store values in db >> delete useEffect after you initially imported the shop data in firebase, because every time it run, it's going to try setting new values inside of the database, which we don't want
        // useEffect( () => {
        //     // categories is name of collection I want
        //     addCollectionAndDocuments("categories", SHOP_DATA);
        // }, [])

    useEffect( () => {
        // because we get promise back we need to wrap await in asycn function
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    }, [])

    // export out of value is products as object
    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
}

// 05 import ProductsProvider in index.js and add in render function
// 06 shop.component.jsx