// commented code is from implementing Sign in with Google Redirect
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth"

// import { 
//     // auth,
//     signInWithGooglePopup, 
//     // signInWithGoogleRedirect, 
//     createUserDocumentFromAuth 
// } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";

const Authentication = () => {

    // signInWithGooglePopup
        // const logGoogleUser = async () => {
        //     // const response = await signInWithGooglePopup();
        //     // console.log(response);
        
        //     const {user} = await signInWithGooglePopup();
        //     const userDocRef = await createUserDocumentFromAuth(user);
        // }

    // signInWithGoogleRedirect 
        // useEffect( () => {
        //     const fetchData = async () => {
        //         const response = await getRedirectResult(auth);
        //         if (response) {
        //         const userDocRef = await createUserDocumentFromAuth(response.user);
        //     }
        // }
        //     fetchData().catch(console.error);
        // }, []);



    return (
        <AuthenticationContainer>
           <SignInForm /> 

        {/* signInWithGooglePopup */}
            {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
        {/* signInWithGoogleRedirect */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}

            <SignUpForm />

        </AuthenticationContainer>
    );
};

export default Authentication