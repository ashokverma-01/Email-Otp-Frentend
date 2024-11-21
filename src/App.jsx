import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import ForgetPassword from "./components/auth/forgetPassword";
import VerifyOtp from "./components/auth/verifyOtp";
import UpdatePassword from "./components/auth/updatePasword";
import Protected from "./helpers/protected";
import Layout from "./helpers/layout";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        ></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </>
  );
};

export default App;
