// our different button types:
// default
// inverted
// google sign in

import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted"
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ( // default is base
    { // when passed button type is google, give back GoogleSignInButton
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

const Button = ( {children, buttonType, ...otherProps} ) => {

    const CustomButton = getButton(buttonType);

    return (
        // <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        //     {children}
        // </button>

        <CustomButton {...otherProps}>
            {children}  
        </CustomButton>
    )
}

export default Button;