
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCiMrlLwI0brJF0igEZ9HOdrgwHqJxaGEI",
    authDomain: "sylvan-plane-423409-u0.firebaseapp.com",
    projectId: "sylvan-plane-423409-u0",
    storageBucket: "sylvan-plane-423409-u0.appspot.com",
    messagingSenderId: "806541556003",
    appId: "1:806541556003:web:cdb7d8429c3543888ef496"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
        .then((result) => {

            user = result.user;
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // The signed-in user info.


        }).catch((error) => {

            console.log(error)
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

        return user;
}


export default app;