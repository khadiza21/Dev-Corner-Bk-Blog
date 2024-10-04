import { Route, Routes } from "react-router-dom";
import UserAuthForm from "./pages/UserAuthForm";
import Navbar from "./components/Navbar";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/Session";

export const UserContext = createContext({});

function App() {

  const [userAuth, setUserAuth] = useState();
  

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })

  }, [])


  return (
    <>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/" element={<Navbar></Navbar>}>
            <Route
              path="signIn"
              element={<UserAuthForm type="sign-in"></UserAuthForm>}
            />
            <Route
              path="signUp"
              element={<UserAuthForm type="Sign-up"></UserAuthForm>}
            />
          </Route>
        </Routes>
      </UserContext.Provider >
    </>
  );
}

export default App;
