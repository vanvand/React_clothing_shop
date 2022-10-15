// to track input fields
import { useState} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";

import { SignUpContainer } from "./sign-up.styles"

// initalized form values
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; 

    // console.log(formFields)

    // context
    // hook sign-up-form into sign-in-form > react will re-run the function (will just re-render if JSX values change based on changed value) >> could run into performance issues, when you have a lot of component hooked into 
    // const { setCurrentUser } = useContext(UserContext)
        // console.log("hit") // just to showcase that hit is printed after hook when sign-in form is called

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // confirm password and confirm passsword match
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;    
        };

        // did we authentificate user?
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);

            // context
            // setCurrentUser(user);

            // building user document object (in firebase database)
            await createUserDocumentFromAuth(user, { displayName });            

            resetFormField();

        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use")
            } else {
            console.log("user creation encountered an error", error);
            }
        }

        // create user document from what createAutUserWithEmailPass
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields( {...formFields, [name]: value} )

    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label="Display Name"
                    type="text"
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                    // you can also put input options as object and add "inputOptions" as prop in form-input.component instead of ""...otherProps"
                    // clear separation on what is associated as input portion vs. lable portion
                        // inputOptions = {{
                        //     type: "text",
                        //     required: "true",
                        //     onChange: handleChange,
                        //     name: "displayName",
                        //     value: displayName,
                        //     }}
                />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                {/* further checked, e.g lenght go here in inpt */}

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                {/* when button with type submit is clicked run onSubmit callback */}
                {/* here you can enter the buttonType if needed, without it will be default button */}
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm