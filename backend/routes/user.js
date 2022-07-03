const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const params_validator = require("../helpers/params-validator");
const jwt_validator = require("../helpers/user-jwt-validate");

const Joi = require("joi");
const User = require("../models/user");

router.post(
  "/signup",
  params_validator.validateParams({
    username: Joi.string()
      .pattern(/^(?=.{8,20}$)(?:[a-zA-Z\d]+(?:(?:\.|_)[a-zA-Z\d])*)+$/)
      .min(8)
      .max(20)
      .required(),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&(=)<>.,/])[A-Za-z\d@$!%*#?&(=)<>.,/]{6,}$/
      )
      .max(20)
      .required(),
    name: Joi.string()
      .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)+$/)
      .min(2)
      .max(40)
      .required(),
    email: Joi.string()
      .pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required(),
    contact: Joi.string()
      .pattern(/^[0-9]{7,10}$/)
      .required(),
  }),
  (req, res, next) => {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
    });

    User.getUserByUsername(newUser.username, (err, user) => {
      if (err) {
        return res.json({ success: false, msg: "Something went wrong." });
      }
      if (user) {
        return res.json({
          success: false,
          msg: "Username has already been registered with us.",
        });
      }
      User.getUserByEmail(newUser.email, (err, user) => {
        if (err) {
          return res.json({ success: false, msg: "Something went wrong." });
        }
        if (user) {
          return res.json({
            success: false,
            msg: "Email has already been registered with us.",
          });
        }

        User.addUser(newUser, (err) => {
          if (err) {
            return res.json({
              success: false,
              msg: "Something went wrong.",
            });
          }
          res.json({
            success: false,
            msg: "User registered successfully.",
          });
        });
      });
    });
  }
);

router.post(
  "/login",
  params_validator.validateParams({
    username: Joi.string()
      .pattern(/^(?=.{8,20}$)(?:[a-zA-Z\d]+(?:(?:\.|_)[a-zA-Z\d])*)+$/)
      .min(8)
      .max(20)
      .required(),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&(=)<>.,/])[A-Za-z\d@$!%*#?&(=)<>.,/]{6,}$/
      )
      .max(20)
      .required(),
  }),
  (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.json({ success: false, msg: "Fill in all the fields." });
    }

    User.getUserByUsername(username, (err, user) => {
      let finalUser;
      if (err) {
        return res.json({ success: false, msg: "Something went wrong." });
      }
      if (user) {
        finalUser = user;
      }
      User.getUserByEmail(username, (err, emailUser) => {
        if (err) {
          return res.json({ success: false, msg: "Something went wrong." });
        }
        if (!user) {
          if (!emailUser) {
            return res.json({ success: false, msg: "Invalid Credentials." });
          }
          finalUser = emailUser;
        }
        User.comparePassword(password, finalUser.password, (err, isMatch) => {
          if (err) {
            return res.json({ success: false, msg: "Something went wrong." });
          }
          if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials." });
          }

          const token = jwt.sign({ data: finalUser }, config.secret, {});
          res.json({
            msg: "Logged in Successfully.",
            success: true,
            token: "JWT " + token,
            user: {
              id: finalUser._id,
              username: finalUser.username,
              name: finalUser.studentName,
              admin: finalUser.admin,
            },
          });
        });
      });
    });
  }
);

router.get(
  "/profile",
  passport.authenticate("user", { session: false }),
  (req, res, next) => {
    res.json({ success: true, user: req.user });
  }
);

router.post(
  "/update-password",
  params_validator.validateParams({
    username: Joi.string().max(20).required(),
    currentPassword: Joi.string().max(20).required(),
    newPassword: Joi.string()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&(=)<>.,/])[A-Za-z\d@$!%*#?&(=)<>.,/]{6,}$/
      )
      .max(20)
      .required(),
    newConfirmPassword: Joi.string().max(20).required(),
  }),
  (req, res, next) => {
    let user = jwt_validator.validateUserJWTToken(req.headers.authorization);
    if (!user) return res.json({ success: false, msg: "Invalid Token." });

    const newUser = {
      username: req.body.username,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
      newConfirmPassword: req.body.newConfirmPassword,
    };

    if (newUser.newPassword != newUser.newConfirmPassword) {
      return res.json({
        success: false,
        msg: "Both Password Fields Do Not Match.",
      });
    }

    if (newUser.currentPassword == newUser.newPassword) {
      return res.json({
        success: false,
        msg: "Current Password Matches With The New Password.",
      });
    }

    User.getUserByUsername(newUser.username, (err, user) => {
      if (err) {
        return res.json({ success: false, msg: "Something went wrong." });
      }
      if (!user) {
        return res.json({ success: false, msg: "User Not Found." });
      }
      User.comparePassword(
        newUser.currentPassword,
        user.password,
        (err, isMatch) => {
          if (err) {
            return res.json({ success: false, msg: "Something went wrong." });
          }
          if (!isMatch) {
            return res.json({ success: false, msg: "Incorrect Password." });
          }
          User.updatePassword(newUser, (err) => {
            if (err) {
              return res.json({ success: false, msg: "Something went wrong." });
            }
            return res.json({ success: true, msg: "Password Updated." });
          });
        }
      );
    });
  }
);

module.exports = router;
