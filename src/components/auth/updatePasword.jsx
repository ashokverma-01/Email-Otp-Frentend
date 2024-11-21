import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../auth/auth.css";
import axios from "axios";
import { ShowToast, Severty } from "../../helpers/toast";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const UpdatePassword = () => {
  const navigate = useNavigate();
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const userDetails = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      const token = localStorage.getItem("authToken");
      if (!token) {
        ShowToast("Token not found. Please request OTP again.", Severty.ERROR);
        setSubmitting(false);
        return;
      }
      const response = await axios.post(
        "http://localhost:3001/user/passwordUpdate",
        {
          ...userDetails,
          token,
        }
      );

      ShowToast("Password updated successfully", Severty.SUCCESS);
      resetForm();
      navigate("/login");
    } catch (error) {
      console.error("Password update error:", error);
      ShowToast(
        error.response?.data?.message || "Failed to update password",
        Severty.ERROR
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={LoginSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <div className="main">
          <Form className="container-form">
            <div className="form-group">
              <label>New Password:</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Password"}
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

export default UpdatePassword;
