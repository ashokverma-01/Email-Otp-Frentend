import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ShowToast, Severty } from "../../helpers/toast.jsx";

const ForgotPassword = () => {
  const navigate = useNavigate(); // Correctly invoke useNavigate()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const otpDetails = {
        email: values.email,
      };

      // Make the API request
      const response = await axios.post(
        "http://localhost:3001/user/forgetPassword",
        otpDetails
      );

      if (response.data.status) {
        localStorage.setItem("authToken", response.data.token);
        ShowToast("OTP sent successfully", Severty.SUCCESS);
        resetForm();
        navigate("/verify-otp");
      } else {
        ShowToast("Failed to send OTP", Severty.ERROR);
      }
    } catch (error) {
      console.error(error);

      // Handle the error and show a proper toast message
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      ShowToast(errorMessage, Severty.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={LoginSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <div className="main">
          <Form className="container-form">
            <div className="form-group">
              <label>Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending OTP..." : "Send OTP"}
              </button>
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
                  Back To Login
                </Link>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ForgotPassword;
