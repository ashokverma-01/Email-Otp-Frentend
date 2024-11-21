import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../auth/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { ShowToast, Severty } from "../../helpers/toast";

const Register = () => {
  const Navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const userDetails = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      await axios.post("http://localhost:3001/user/register", userDetails);
      ShowToast("User Register successfully", Severty.SUCCESS);
      resetForm();
      Navigate("/login");
    } catch (error) {
      ShowToast("Failed to add user", Severty.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <div className="main">
          <Form className="container-form">
            <div className="form-group">
              <label>Name:</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
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
              <button type="submit">Signup</button>
            </div>
            <div className="form-group">
              <div className="pageLink1">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Login
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
