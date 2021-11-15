import React from 'react';
import Cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import './Login.css';
import { Redirect, withRouter } from 'react-router-dom';

function Login(props) {

    const [data, setData] = useState({
        username: "",
        password: "",
    })

    useEffect( ()=> {
        props.setShowHeader(true);
    }, [])

    function handleChange(e) {
        let {name, value} = e.target;
        let updatedData = {...data, [name]: value };
        setData(updatedData);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get("csrftoken")
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('/rest-auth/login/', options)
        if (response.ok === false) {
            console.log("LOGIN FAILED", response);
        } else {
            const data = await response.json();
            Cookie.set('Authorization', `Token ${data.key}`)
            props.setIsAuth(true);

        }
    }

    function handleReRoute() {
        props.history.push('/registration');
    }

    if (props.isAuth === true) {
       return <Redirect to="/gardenlist" />
    }

    return (
        <div className="login-outer-container">
            <div className="login-inner-container">
            <form action="" className="form-control login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label login-label">Username:</label>
                    <input className="form-control" type="text" id="username" name="username" value={data.username} placeholder="Enter Username.." onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label login-label mt-3">Password:</label>
                    <input className="form-control" type="password" id="password" name="password" value={data.password} placeholder="Enter Password.." onChange={handleChange} />
                </div>
                <p className="login-reroute-text">New to Flourish? <button type="button" className="login-reroute-btn" onClick={handleReRoute}>SIGN UP</button></p>
                <button className="flagship-btn login-btn">Login</button>
            </form>
            </div>

            
        </div>
    )
}

export default withRouter(Login)