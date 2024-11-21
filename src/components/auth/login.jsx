import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../auth/auth.css";
import { ShowToast, Severty } from "../../helpers/toast";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const userDetails = {
        email: values.email,
        password: values.password,
      };
      const response = await axios.post(
        "http://localhost:3001/user/login",
        userDetails
      );
      localStorage.setItem("authToken", response.data.token);
      ShowToast("User Login successfully", Severty.SUCCESS);
      resetForm();
      navigate("/");
    } catch (error) {
      ShowToast("Failed to add user", Severty.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <div className="main">
          <Form className="container-form">
            <div className="form-group">
              <label>Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <div className="form-group">
              <div className="pageLink1">
                <Link
                  to="/forget-password"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            <div className="form-group">
              <div className="pageLink">
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
