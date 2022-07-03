import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import validator from "validator";

import axios from "../../api/axios";
import { registerRoute } from "../../api/routes";
import FormField from "../../components/FormField/FormField";

import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!validator.isAlpha(name)) {
      formIsValid = false;
      setNameError("Name Not Valid");
      return false;
    } else {
      setNameError("");
      formIsValid = true;
    }

    if (!validator.isEmail(email)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      formIsValid = false;
      setpasswordError(
        "Must contain 8 characters, one uppercase letter, one lowercase letter, one number, and one special symbol"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    setFormValid(formIsValid);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();

    if (formValid) {
      axios
        .post(registerRoute, {
          name: name,
          email: email,
          password: password,
        })
        .then(function (response) {
          toast.success("Registration Successful!");
          navigate("/login");
        })
        .catch(function (error) {
          toast.error(error.response.data.msg);
        });
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <form id="loginform" onSubmit={loginSubmit} className="register-form">
            <h3 className="text-center register-header">Register</h3>
            <div className="form-group mt-2">
              <h5>Name</h5>
              <FormField
                type="text"
                placeholder="Enter Name"
                setFunc={setName}
              />
              <small id="nameError" className="text-danger form-text mt-2">
                {nameError}
              </small>
            </div>
            <div className="form-group mt-2">
              <h5>Email address</h5>
              <FormField
                type="email"
                placeholder="Enter Email"
                setFunc={setEmail}
              />
              <small id="emailError" className="text-danger form-text mt-2">
                {emailError}
              </small>
            </div>
            <div className="form-group mt-4">
              <h5>Password</h5>
              <FormField
                type="password"
                placeholder="Enter Password"
                setFunc={setPassword}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <div className="text-center submit-btn">
              <button type="submit" className="btn btn-dark mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
