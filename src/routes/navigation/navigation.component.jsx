// instead of using an outside <div> wrapped around entire app (as parent) we use Fragement = component which renderes to nothing mounting to the DOM; usefull if you don't want to render a specific HTML element
import { Fragment, useContext } from "react";
// import to use nested routes
// Link behaves like an anchor tag
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

// Images can be imported as Component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { signOutUser } from "../../utils/firebase/firebase.utils"; 


// import "./navigation.styles.scss"
// styled component
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {

  // context - whenever UserContext updates > update currentUser > this hook is needed to re-render the page after user sign-in (render sing-out button instead of sign-in)
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);



  // we don't need this and listening to currentUser after implementing the onAuthStateChangedListener implementation in firebase.utils
    // const signOutHandler = async () => {
    //   await signOutUser()
    //   setCurrentUser(null)
    // }

  return (
    <Fragment>
      {/* <div className="navigation"> */}
      <NavigationContainer>

            {/* Logo */}
            {/* <Link className="logo-container" to="/"> */}
            <LogoContainer to="/">
              <CrwnLogo className="logo"/>
            </LogoContainer>

            {/* Navigation Links */}
            {/* <div className="nav-links-container"> */}
            <NavLinks>
                {/* <Link className="nav-link" to="/shop"> */}
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                
                {/* if the currentUser exist render Sign Out link, if not Sign In */}
                {currentUser ? (
                    // <span className="nav-link" onClick={signOutUser}> 
                    <NavLink as="span" onClick={signOutUser}>
                      SIGN OUT
                    </NavLink>
                  ): (
                    <NavLink className="nav-link" to="/auth">SIGN IN</NavLink>
                  )}
                
                <CartIcon />
            </NavLinks>
                    {/* CartDropdown is component > components always evaluate to truthy values 
                    >> if total thing evaluate to true > I return to you the last thing you gave me = CartDropdown. If isCartOpen false it would exit, show nothing */}
            {isCartOpen && <CartDropdown />}
            
      </NavigationContainer>
      {/* rendering of nested routes */}
      <Outlet />
    </Fragment>
  )
};

export default Navigation;