import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import UserAuthForm from "./pages/UserAuthForm";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar></Navbar>} >
          <Route path="signIn" element={<UserAuthForm type="sign-in"></UserAuthForm>} />
          <Route path="signUp" element={<UserAuthForm type="Sign-up"></UserAuthForm>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
