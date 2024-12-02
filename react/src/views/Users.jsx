import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import { useStateContext } from "../Context/ContextProvider";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotifications} = useStateContext

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (u) => {
        // Implement delete logic here
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${u.id}`).then(() => {
            // Refresh users list
            setNotifications("User deleted successfully");
            getUsers();
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log(data);
                // setUsers(response.data);
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                // console.log(error);
                setLoading(false);
            });
    };
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">
                    Add New
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created_at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u) => {
                                return (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.created_at}</td>
                                        <td>
                                            <Link
                                                className="btn-edit"
                                                to={`/users/${u.id}`}
                                            >
                                                Edit
                                            </Link>{" "}
                                            |{" "}
                                            <button
                                                href="#"
                                                className="btn-delete"
                                                onClick={(ev) => onDelete(u)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Users;
