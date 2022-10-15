import { createContext, useState, useEffect } from "react";


// ######################################
// helper function > find inside of existing array any item that match id of new Item > if present increase qty, if not add
const addCartItem = ( cartItems, productToAdd ) => {
    // find if cardItems contains productToAdd
    const existingCartItem = cartItems.find( (cartItem) => cartItem.id === productToAdd.id)
    // If found, increment quantity
    if(existingCartItem) {
        return cartItems.map( (cartItem) => cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 } // new cartItem object, spreading through old properties of cartItem and add quantitiy plus 1
        : cartItem); // just return the cartItem
    }
    // return new array with modified cartItems / new cart item
    // to all existing cartItems, we add new cardItem with productToAdd with additional quantity field of one
    return [...cartItems, { ...productToAdd, quantity: 1}]
}


// ######################################
const removeCartItem = ( cartItems, cartItemToRemove ) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find( (cartItem) => cartItem.id === cartItemToRemove.id)
    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
        // filter out anything equal to false, so when if match cartItemToRemove.id > if true keep the value, so all not to be removed ones
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map( (cartItem) => cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem);
}

// ######################################
const clearCartItem = ( cartItems, cartItemToClear ) => cartItems.filter( (cartItem) => cartItem.id !== cartItemToClear.id)


// ######################################
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}, // to control the quantitiy we don't want to set the product array directly > we want to add our own method
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0, // total item count cartIcon with useEffect
    cartTotal: 0,
})


/*
products        CartItems
{               {
    id,             id,
    name,           name,
    price,          price,
    imageUrl        imageUrl,
}                   quantity
                }
*/


export const CartProvider = ( {children} ) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    // everytime cartItems array change, we recalculate the cartCount
    useEffect( () => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 )
        setCartCount(newCartCount);
    }, [cartItems])

    // best practice: useEffect has one responsibility, so not mix with cartCount
    useEffect( () => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0 )
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => { 
        setCartItems( addCartItem (cartItems, productToAdd ));
    }

    const removeItemFromCart = (cartItemToRemove) => { 
        setCartItems( removeCartItem (cartItems, cartItemToRemove ));
    }

    const clearItemFromCart = (cartItemToClear) => { 
        setCartItems( clearCartItem (cartItems, cartItemToClear ));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
        };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}