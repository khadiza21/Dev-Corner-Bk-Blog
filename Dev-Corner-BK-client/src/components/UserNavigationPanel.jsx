import { Link } from "react-router-dom";
import Animation from "../common/Animation"
import { useContext } from "react";
import { UserContext } from "../App";
import { removeFormSession } from "../common/Session";


const UserNavigationPanel = () => {


    // Destructure userAuth safely
    const { userAuth = {}, setUserAuth } = useContext(UserContext);
    const { username } = userAuth; // Destructure values from userAuth

    const signOutUser = () => {
        removeFormSession("user")
        setUserAuth({ access_token: null })
    }


    return (
        <>
            <Animation
                className="absolute right-0 z-50"
                transition={{ duration: 0.2 }}>

                <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
                    <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                        <i className="fi fi-rr-file-edit"></i>
                        <p>write</p>
                    </Link>

                    <Link className="link pl-8 py-4" to={`/user/${username}`}>Profile</Link>
                    <Link className="link pl-8 py-4" to="dashboard/blogs">DashBoard</Link>
                    <Link className="link pl-8 py-4" to="settings/edit-profile">Settings</Link>
                    <span className="absolute border-t border-grey  w-[100%]"></span>

                    <button
                        onClick={signOutUser}
                        className="text-left p-4 hover:bg-grey w-full pl-8">
                        <h1 className="font-bold text-xl mb-1">Sign Out</h1>
                        <p className="text-dark-grey">@{username}</p>
                    </button>

                </div>

            </Animation>
        </>
    );
};

export default UserNavigationPanel;