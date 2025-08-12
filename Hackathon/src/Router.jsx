import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup.jsx";
import Forgetpassword from "./Auth/Forgetpassword";
import App from "./App.jsx"
import ProtectedRoutes from "./ProtectedRoutes.jsx";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={
            <ProtectedRoutes>
            <App />
            </ProtectedRoutes>
      }/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/forgetpassword" element={<Forgetpassword />}/>
        {/* <Route path="/forgetpassword" element={<Forgetpassword />}/> */}
        
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}


export default Router
