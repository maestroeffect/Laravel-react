import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";

const Signup = () => {
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        };
        console.log(payload);

        // Make API request to signup endpoint\
        axiosClient.get("http://localhost:8000/sanctum/csrf-cookie").then(async () => {
            axiosClient.post("/signup", payload)
            .then(({ data }) => {
            // console.log("response")

                setUser(data.user);
                setToken(data.token);

            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
            });
        })

    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign Up Now!</h1>

                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <input ref={nameRef} type="text" placeholder="Fullname" />
                    <input ref={emailRef} type="text" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button className="btn btn-block" type="submit">
                        Sign Up
                    </button>
                    <p className="message">
                        Already have an account? <Link to="/login">Login</Link>{" "}
                        | <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
