import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
import axiosClient from "../axios-client";

const Login = () => {
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then((response) => {
                console.log(response); // Check the structure of the response
                const { token, user } = response.data; // Assuming the response is in data
                if (token) {
                    localStorage.setItem("ACCESS_TOKEN", token);
                    setUser(user);
                    setToken(token);
                } else {
                    console.error("No token found in the response.");
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your Account</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block" type="submit">
                        Login
                    </button>
                    <p className="message">
                        Forgot Password? <a href="#">Reset Password</a> | Don't
                        have an account? <Link to="/signup">Sign Up</Link> |{" "}
                        <a href="#">Terms & Conditions</a>|{" "}
                        <a href="#">Privacy Policy</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
