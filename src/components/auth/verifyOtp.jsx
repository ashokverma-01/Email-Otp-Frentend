import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Timer from "./timer";
import { ShowToast, Severty } from "../../helpers/toast";

const VerifyOtp = () => {
  const [otpTime, setOtpTime] = useState(null);
  const navigate = useNavigate();
  const OTP_LENGTH = 6;

  const OtpValidationSchema = Yup.object().shape({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^\d$/, "Must be a single digit")
          .required("Required")
      )
      .length(OTP_LENGTH, `OTP must be ${OTP_LENGTH} digits`),
  });

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      const otpDetails = { otp: values.otp.join("") }; // Join OTP array into a single string
      await axios.post("http://localhost:3001/user/verifyOtp", otpDetails);
      ShowToast("OTP Verified successfully", Severty.SUCCESS);
      resetForm();
      navigate("/update-password");
    } catch (error) {
      console.error(error);
      ShowToast("Failed to verify OTP", Severty.ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getTime = async () => {
      try {
        // Fetch tokens from localStorage
        const authToken = localStorage.getItem("authToken");
        const passToken = localStorage.getItem("passToken");

        if (!authToken) throw new Error("Auth token not found");
        if (!passToken) throw new Error("Pass token not found");

        // Make the POST request
        const response = await axios.post(
          "http://localhost:3001/user/getOtpTime",
          { token: passToken }, // Body data
          { headers: { Authorization: `Bearer ${authToken}` } } // Headers
        );

        // Handle response
        setOtpTime(response?.data?.sendTime);
        console.log("OTP Send Time:", response.data.sendTime);
      } catch (error) {
        console.error("Error fetching OTP send time:", error);
      }
    };

    getTime();
  }, []);

  const handleInputChange = (e, index, values, setFieldValue) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...values.otp];
      newOtp[index] = value;
      setFieldValue("otp", newOtp);

      // Automatically move focus to the next input
      if (value && e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (e, index, values, setFieldValue) => {
    if (
      e.key === "Backspace" &&
      !values.otp[index] &&
      e.target.previousSibling
    ) {
      e.target.previousSibling.focus();
    }
  };

  const handlePaste = (e, setFieldValue) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData
        .split("")
        .concat(new Array(OTP_LENGTH - pastedData.length).fill(""));
      setFieldValue("otp", newOtp);

      const lastFilledIndex = newOtp.findIndex((char) => char === "");
      const focusIndex =
        lastFilledIndex === -1 ? OTP_LENGTH - 1 : lastFilledIndex;
      document.querySelectorAll(".otp-input")[focusIndex]?.focus();
    }
  };

  return (
    <Formik
      initialValues={{ otp: Array(OTP_LENGTH).fill("") }}
      validationSchema={OtpValidationSchema}
      onSubmit={submitHandler}
    >
      {({ values, setFieldValue }) => (
        <div className="main">
          <Form className="container-form">
            <div className="form-group">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                OTP:
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {values.otp.map((value, index) => (
                  <Field
                    key={index}
                    name={`otp[${index}]`}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    style={{
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      fontSize: "18px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                    value={value}
                    onChange={(e) =>
                      handleInputChange(e, index, values, setFieldValue)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index, values, setFieldValue)
                    }
                    onPaste={(e) => handlePaste(e, setFieldValue)}
                  />
                ))}
              </div>
              <ErrorMessage
                name="otp"
                component="div"
                className="error"
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>

            <div className="form-group">
              <button type="submit">Verify</button>
            </div>
            <div className="form-group">
              <Timer />
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

export default VerifyOtp;
