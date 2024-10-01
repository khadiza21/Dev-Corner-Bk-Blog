import { Link, Outlet } from "react-router-dom";
import logo from "../images/logo.png"
import { useState } from "react";


const Navbar = () => {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

    return (
        <>
            <nav className="navbar">

                <Link href="/" className="flex-none w-10">
                    <img src={logo} alt="" className="w-full" />
                </Link>

                <div className={"  absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:show md:w-auto " + (searchBoxVisibility ? "show" : "hide")}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-14" />
          

                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="size-6 w-6 absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </div>



                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="size-2 w-6 text-xl">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>

                    <Link to="/editor" className="hidden md:flex gap-2 link">
                        <i className="fi fi-rr-file-edit"></i>
                        <p>Write</p>
                    </Link>

                    <Link to="/signIn" className="btn-dark py-2">Sign In</Link>
                    <Link to="/signUp" className="btn-light py-2 hidden md:block">Sign Up</Link>

                </div>

            </nav>

            <Outlet />

        </>
    );
};

export default Navbar;