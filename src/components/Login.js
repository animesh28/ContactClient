import React, { useState, useEffect } from "react";
import "./styles/login.styles.scss";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Cookies from "universal-cookie";
import { successsMessage, errorMessage } from "../subcomponents/ToastMessage";
import { errorHelper } from "../helper/formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import jwt_decode from "jwt-decode";

function Login() {
  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    handleGoogleLogin(userObject);
  };

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "706749396195-07rc88va8qpoj47pbmqe6bgrmgs6nfn3.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googleBtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const from = location.state?.from?.pathname || "/";
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, E-mail is required")
        .email("Enter a valid e-mail"),

      password: Yup.string().required("Sorry, Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleLogin(values);
    },
  });

  const handleLogin = (values) => {
    axios
      .post("https://contact-sever.onrender.com/api/auth/signin", {
        ...values,
      })
      .then((response) => {
        if (response.data.success) {
          new Cookies().set("user-token", response.data.token);
          successsMessage("Login Successfull");
          new Cookies().remove("x-access-token");
          sessionStorage.setItem("user", JSON.stringify(response.data));
          setAuth(response.data);
          navigate(from, { replace: true });
        }
      })
      .catch((err) => errorMessage(`Check the credentials!`, err));
  };

  const handleGoogleLogin = ({ email, iss, sub, name }) => {
    axios
      .post("https://contact-sever.onrender.com/api/auth/emailExists", {
        email,
      })
      .then((response) => {
        if (response.data.found) {
          handleLogin({ email: email, password: iss + sub });
        } else {
          handleSignUp({
            email: email,
            password: iss + sub,
            fullname: name,
          });
        }
      })
      .catch((err) => errorMessage(`Check the credentials!`, err));
  };

  const handleSignUp = (values) => {
    axios
      .post("https://contact-sever.onrender.com/api/auth/signup", {
        ...values,
      })
      .then((response) => {
        if (!response.data.id) {
          errorMessage(`Error creating User!`);
        } else {
          handleLogin({ email: values.email, password: values.password });
        }
      })
      .catch((err) => errorMessage(`Can't connect to DB!` + err));
  };

  return (
    <div className="login_container">
      <TextField
        id="email"
        className="login_input"
        label="E-mail"
        variant="filled"
        {...loginFormik.getFieldProps("email")}
        {...errorHelper(loginFormik, "email")}
      />
      <TextField
        id="password"
        className="login_input"
        type={showPassword ? "text" : "password"}
        label="Password"
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...loginFormik.getFieldProps("password")}
        {...errorHelper(loginFormik, "password")}
      />
      <Button variant="contained" onClick={loginFormik.handleSubmit}>
        Login
      </Button>
      <div id="googleBtn" style={{ marginTop: "1.5rem" }}></div>
    </div>
  );
}

export default Login;
