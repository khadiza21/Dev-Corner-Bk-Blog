import Animation from "../common/Animation";
import InputBox from "../components/InputBox";
import googleIcon from "../images/google.png";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useContext, useRef } from "react";
import { storeInSession } from "../common/Session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/Firebase";

const UserAuthForm = ({ type }) => {
    const authForm = useRef(); // useRef for the form

    // Destructure userAuth and setUserAuth from context
    let { userAuth: { access_token } = {}, setUserAuth } = useContext(UserContext);

    const userAuthThroughServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data)); // Store user in session storage
                setUserAuth(data); // Set user authentication in state
            })
            .catch(({ response }) => {
                toast.error(response.data.error); // Show error toast
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        let serverRoute = type === "sign-in" ? "/signIn" : "/signUp";

        // Validation regex for email and password
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        // Create formData object using authForm.current
        let form = new FormData(authForm.current);
        let formData = {};

        // Convert form data to an object
        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        // Destructure formData fields
        let { fullname, email, password } = formData;

        // Form validation
        if (type !== "sign-in" && (!fullname || fullname.length < 3)) {
            return toast.error("Full name must be at least 3 letters long");
        }

        if (!email || !emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }

        if (!password || !passwordRegex.test(password)) {
            return toast.error(
                "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter."
            );
        }

        // Submit the form data to the server
        userAuthThroughServer(serverRoute, formData);
    };


    const handleGoogleAuth = async (e) => {
        e.preventDefault();
        await authWithGoogle().then(user => {
            console.log(user);
        }).catch(err => {
            toast.error('Trouble login Through google.');
            return console.log(err)
        })

    }


    return (
        <>
            {access_token ? (
                <Navigate to="/" /> // Redirect if already authenticated
            ) : (
                <Animation keyValue={type}>
                    <section className="h-cover flex items-center justify-center">
                        <Toaster />
                        <form
                            id="authForm"
                            ref={authForm} // Add ref to form element
                            onSubmit={handleSubmit} // Handle form submission
                            className="w-[80%] max-w-[400px]"
                        >
                            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                                {type === "sign-in" ? "Welcome Back" : "Join Us Today"}
                            </h1>

                            {type !== "sign-in" && (
                                <InputBox
                                    name="fullname"
                                    type="text"
                                    placeholder="Full Name"
                                    icon="fi-rr-user"
                                />
                            )}

                            <InputBox
                                name="email"
                                type="email"
                                placeholder="Email"
                                icon="fi-rr-envelope"
                            />

                            <InputBox
                                name="password"
                                type="password"
                                placeholder="Password"
                                icon="fi-rr-key"
                            />

                            <button
                                type="submit"
                                className="btn-dark center mt-14"
                            >
                                {type.replace("-", " ")}
                            </button>

                            <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2 border-black" />
                                <p>or</p>
                                <hr className="w-1/2 border-black" />
                            </div>

                            <button className="btn-dark flex items-center justify-center gap-4 w-[100%] center"
                                onClick={handleGoogleAuth}
                            >


                                <img className="w-5" src={googleIcon} alt="" />
                            </button>

                            {type == "sign-in" ? (
                                <p className="mt-6 text-dark-grey text-xl text-center">
                                    Don&apos;t have an account?
                                    <Link
                                        className="underline text-black text-xl ml-1"
                                        to="/signUp"
                                    >
                                        Join Us Now.
                                    </Link>
                                </p>
                            ) : (
                                <p className="mt-6 text-dark-grey text-xl text-center">
                                    Have An Account?
                                    <Link
                                        className="underline text-black text-xl ml-1"
                                        to="/signIn"
                                    >
                                        Sign In Here.
                                    </Link>
                                </p>
                            )}
                        </form>
                    </section>
                </Animation>
            )}
        </>
    );
};

export default UserAuthForm;


