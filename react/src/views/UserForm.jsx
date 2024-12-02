import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Context/ContextProvider";

const UserForm = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState();
    const {setNotification} = useStateContext();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    // Form logic here
        // console.log(id);

        useEffect(() => {
            if (id) {
                const url = `/users/${id}`;
                // console.log("Fetching URL:", url);
                setLoading(true);
                axiosClient
                    .get(url)
                    .then(({ data }) => {
                        // console.log("Response Data:", data); // Should log the data
                        setUser(data?.user);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        if (error.response) {
                            console.error("Error Response:", error.response.data);
                            console.error("Status Code:", error.response.status);
                        } else if (error.request) {
                            console.error("No Response Received:", error.request);
                        } else {
                            console.error("Error Setting Up Request:", error.message);
                        }
                    });
            }
        }, [id]);


        const onSubmit = (ev) => {
            ev.preventDefault();

            // Make API request to update user endpoint
            if (user.id) {
                axiosClient.put(`/users/${user.id}`, user).then(({ data }) => {
                    // Handle success response
                    // console.log("Success");
                    setNotification("User was successfully updated")

                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    } else {
                        console.error("Error:", err);
                    }
                });
            } else {
                axiosClient.post(`/users`, user).then(({ data }) => {
                    // Handle success response
                    setNotification("User was successfully created")

                    navigate('/users')
                })
               .catch(err => {
                const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    } else {
                        console.error("Error:", err);
                    }
                });
            }

        };

        // console.log(user);


    return (
        <>
            {user.id ? <h1>Update User: {user?.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <input
                        value={user && user.name}
                        onChange={(ev) =>
                            setUser({ ...user, name: ev.target.value })
                        }
                        ref={nameRef}
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        value={user && user.email}
                        onChange={(ev) =>
                            setUser({ ...user, email: ev.target.value })
                        }
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        onChange={(ev) =>
                            setUser({ ...user, password: ev.target.value })
                        }
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        onChange={(ev) =>
                            setUser({
                                ...user,
                                password_confirmation: ev.target.value,
                            })
                        }
                        ref={passwordConfirmRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button className="btn">
                        {user.id ? "Save" : "Create User"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default UserForm;
