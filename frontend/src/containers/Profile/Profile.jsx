import { useContext, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

import { AuthContext } from "../../contexts/AuthContext";

import axios from "../../api/axios";
import { changePasswordRoute } from "../../api/routes";
import FormField from "../../components/FormField/FormField";

import "./Profile.scss";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const { user } = useContext(AuthContext);

  const handleValidation = (event) => {
    let formIsValid = true;

    if (
      !validator.isStrongPassword(currentPassword, {
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
        .post(changePasswordRoute, {
          email: user.email,
          currentPassword: currentPassword,
          newPassword: newPassword,
          newConfirmPassword: newConfirmPassword,
        })
        .then(function (response) {
          toast.success("Password Changed Successfully!");
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
          <form id="loginform" onSubmit={loginSubmit} className="login-form">
            <h3 className="text-center login-header">Change Password</h3>
            <div className="form-group mt-4">
              <h5>Current Password</h5>
              <FormField
                type="password"
                placeholder="Enter Password"
                setFunc={setCurrentPassword}
              />
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>

            <div className="form-group mt-4">
              <h5>New Password</h5>
              <FormField
                type="password"
                placeholder="Enter Password"
                setFunc={setNewPassword}
              />
            </div>

            <div className="form-group mt-4">
              <h5>New Confirm Password</h5>
              <FormField
                type="password"
                placeholder="Enter Password"
                setFunc={setNewConfirmPassword}
              />
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

export default Profile;
