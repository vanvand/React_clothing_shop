// to track input fields
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer, ButtonsContainer } from "./sign-in-form.styles";

// import { UserContext } from "../../contexts/user.context";

// initalized form values
const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields; 

    // console.log(formFields)

    // context
    // const { setCurrentUser } = useContext(UserContext)

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        // context
        // setCurrentUser(user)
        // await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // we want to store this user object inside the Context to make it available for other components
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            // context
            // setCurrentUser(user)
            
            resetFormField();

        } catch(error) {
            // there is no compiled list of possible error codes within firebase
            switch(error.code) {
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields( {...formFields, [name]: value} )

    }

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                {/* further checked, e.g lenght go here in inpt */}


            <ButtonsContainer>               
                {/* when button with type submit is clicked run onSubmit callback */}
                {/* here you can enter the buttonType if needed, without it will be default button */}
                <Button type="submit">Sign In</Button>

                {/* type="button" needs to be added to prevent browser throwing errors behind the google sign in window */}
                <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign in with Google</Button>
            </ButtonsContainer>
            
            </form>
        </SignUpContainer>
    )
}

export default SignInForm