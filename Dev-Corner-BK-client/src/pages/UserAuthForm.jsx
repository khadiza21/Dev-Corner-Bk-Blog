
import Animation from "../common/Animation";
import InputBox from "../components/InputBox";
import googleIcon from "../images/google.png";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { useRef } from "react";
import { storeInSession } from "../common/Session";
// import { useContext, useRef } from "react";


const UserAuthForm = ({ type }) => {

    const authForm = useRef();

    // let {userAuth: {access_token}, setUserAuth}= useContext(UserContext);

    const userAuthThroughServer = (serverRoute, formData) => {


        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data))
                //    setUserAuth(data);
                console.log(data)

            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })



    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == "sign-in" ? "/signIn" : "/signUp";

        // let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        // let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        //  formData object create
        let authForm = document.getElementById("authForm");
        let form = new FormData(authForm);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        // let { fullname, email, password } = formData;

        // Form validation

        // if (  type != "sign-in") {
        //     if(fullname.length < 3){
        //          return toast.error("Fullname must be at least 3 letters long");
        //     }

        // }

        // if (email.length < 3) {
        //     return toast.error("Enter Email.");
        // }
        // if (!emailRegex.test(email)) {
        //     return toast.error("Email is invalid");
        // }
        // if (!passwordRegex.test(password)) {
        //     return toast.error(
        //         "Password should be 6 to 20  characters long with a numeric, 1 lowercase and 1 uppercase letter."
        //     );
        // }


        userAuthThroughServer(serverRoute, formData);

    };




    return (
        <>
            {/* { access_token ? <Navigate to="/" /> : ""} */}
            <Animation keyValue={type}>
                <section className="h-cover flex items-center justify-center">
                    <Toaster />
                    <form
                        id="authForm"

                        action=""
                        className="w-[80%] max-w-[400px]"
                    >
                        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                            {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
                        </h1>

                        {type != "sign-in" ? (
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                            ></InputBox>
                        ) : (
                            ""
                        )}

                        <InputBox
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                        ></InputBox>

                        <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-key"
                        ></InputBox>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn-dark center mt-14"
                        >
                            {type.replace("-", " ")}{" "}
                        </button>

                        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                            <hr className="w-1/2 border-black" />
                            <p>or</p>
                            <hr className="w-1/2 border-black" />
                        </div>

                        <button className="btn-dark flex items-center justify-center gap-4 w-[100%] center">
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
        </>
    );
};

export default UserAuthForm;
