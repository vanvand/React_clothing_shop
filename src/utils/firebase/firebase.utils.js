// (1) to get started with firebase create new project online on firebase.google.com

// (2) initializeApp function creates an App instance based on some type of configuration
import { initializeApp } from "firebase/app";

// (5) 
 import { 
     getAuth,
     signInWithRedirect,
     signInWithPopup,
     GoogleAuthProvider,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signOut,
     onAuthStateChanged, // observerable listener: hook in a stream of events (sign-in or sign-out events) able to trigger sth based on these changes > return back a listener

 } from "firebase/auth";

// important to isolate firestore/firebase methods into helper function to minimize the impact that changing third party libraries have on our code base, so we only need to apply changes here 

// (7) after setting up database called firestore import this
import {
    getFirestore, // instanceiate
    doc, // get document instance
    getDoc, // getting document data
    setDoc, // setting document data
    collection, // get shop data
    writeBatch, // get shop data
    query,
    getDocs,
} from "firebase/firestore"

// (3) Register app to web (Web button) w/ name domas-clothing-web-app >> firebase provide you with a package > follow instructions
// (4) copy Firebase configuration & Initalize Firebase part
const firebaseConfig = {
  apiKey: "AIzaSyADZkIh6LcWjgeUafEOGQWB1poE1TnkgEA",
  authDomain: "domas-clothing-db.firebaseapp.com",
  projectId: "domas-clothing-db",
  storageBucket: "domas-clothing-db.appspot.com",
  messagingSenderId: "888601272759",
  appId: "1:888601272759:web:4c7aee267364eef4410832"
};

const firebaseApp = initializeApp(firebaseConfig);


// (5) add authentication
const googleProvider = new GoogleAuthProvider();

// how should googleAuthProvider behave?
googleProvider.setCustomParameters( {
    // user should always select account
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// (6) go back to browser click "continue to console" > Authentication (left side navi) > Get started > Sign-in-method > Google
// Sign-in provides > Enable (right top button) > enter project support email >> now it should have Status: Enabled

// now we can implement the signInWithGooglePopUp in our sign-in.component

// (7) database set-up
export const db = getFirestore();


// ###########################################

// bring in shop data to firebase, respective useEffect in products.context.jsx
// using async because adding to external source, calling upon API to store data
export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd, 
    field,
    // field = "title",
    ) => {
    // go with our db instance (like with auth) > get my collection within db and within db what specific collectionKey are you looking for
    const collectionRef = collection(db, collectionKey);
    
    /*
    transaction = successful unit of work to a database, might be multiple sets of setting values in a collection
    example money transfer:  both of these writes have to go through to be considered as successful transaction = one unit of work, allthough two separate events happening
    when not successfull all rights are set back and can be attempted newly

    Yihua: 1000 => 900
    - 100

    Andrei: 1000 => 1100
    +100
    */

    const batch = writeBatch(db);

    objectsToAdd.forEach( (object) => {
        // equal to calling the userdocRef method, instead passing db we pass the collectionRef (created above)
        const docRef = doc(collectionRef, object.title.toLowerCase());// or object.[field]
        batch.set(docRef, object);
    });
    // fire of batches
    await batch.commit();
    console.log("done");
} 


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce( (acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap
}

// ###########################################

// create our users when authenticating
// additionalInformation: object > if displayName has no value (with sign-up) we add additional information ourself
export const createUserDocumentFromAuth = async ( 
    userAuth, 
    additionalInformation ={} ) => {

    // if userAuth not present then do not run the function
    if(!userAuth) return;

    // is there an existing document reference
    // identifier comes from logGoogleUser object > user > uid
    const userDocRef = doc(db, "users", userAuth.uid); // doc(db, collection, identifier)

    console.log(userDocRef);

    // gives us a document snapshot > special object which allow us to check if the instance exist in our firestore database
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot) // access data
    console.log(userSnapshot.exists()) // tells us if the object really exist in the database > true/false



    if(!userSnapshot.exists()) { // check if user data exists > and flip boolean (!)

        // if user data does not exist >> create/set the document with the data from userAuth in my collection
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            // set the doc with this object
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });

        } catch(error) {
            console.log("error creating the user", error.message);
        }
    }

    // if user data does exist >> return userDocRef
    return userDocRef
    
};

// ###### helper functions ######

// create authentificated user and give back some auth object
export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

// sign in authentificated user and give back some auth object
export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); // 2nd argument: callback that you want to call every time this auth state changes (e.g. when user sign in considered as change and callback is running > user sign out, callback is running) > whenever you instanciate give me a callback