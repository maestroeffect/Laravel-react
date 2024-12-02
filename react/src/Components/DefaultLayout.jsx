import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider'
import axiosClient from '../axios-client';

const DefaultLayout = () => {
    const {user, token, notification, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        // Implement logout logic here
        // Example: localStorage.removeItem('token')
        // Redirect to login page
        // Example: <Navigate to="/login" />
        ev.preventDefault();
        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null);
        })

    }

    // useEffect(() => {
    //     // Fetch user data when token is present
    //     // Example: axios.get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
    //     //.then(response => setUser(response.data))
    //     //.catch(error => console.log(error))
    //     // axiosClient.get('/user').then(({data}) => {
    //     //     setUser(data);
    //     // })
    // })
  return (
    <div id='defaultLayout'>
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className='content'>
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <a href='#' className='btn-logout' onClick={onLogout}>Logout</a>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
        {notification && <div className='notification'>{notification}</div>}
    </div>
  )
}

export default DefaultLayout
