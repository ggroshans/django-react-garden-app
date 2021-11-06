import React from "react";
import "./Header.css";
import Leaf from "../../images/leaf.png";
import { Redirect, withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import Farmer from "../../images/farmer.png";
import {Button, Collapse} from 'react-bootstrap';

function Header(props) {
    const [username, setUsername] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        grabUserName();
    }, []);

    async function grabUserName() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch("/rest-auth/user/", options);
        if (response.ok === false) {
            console.log("LOGIN FAILED", response);
        } else {
            const data = await response.json();
            Cookie.set("Authorization", `Token ${data.key}`);
            setUsername(data.username);
        }
    }

    // function handleClick() {
    //     if (props.isAuth) {
    //         props.history.push(`/gardenlist/`);
    //     } else {
    //         props.history.push(`/`);
    //     }
    // }

    // function handleUserIconClick() {
    //     props.history.push("/gardenlist/");
    // }

    function handleProfileClick() {
        props.history.push("/gardenlist/");
        setOpen(false);
    }

  async function handleLogoutClick() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookie.get("csrftoken"),
        },
    };
    const response = await fetch("/rest-auth/logout/", options);
    if (response.ok === false) {
        console.log("LOGOUT FAILED", response);
    } else {
        const data = await response.json();
        Cookie.remove("Authorization")
        console.log("LOGOUT SUCCESSFUL", data)
        props.history.push("/");
        props.setIsAuth(false);
        setOpen(false);
    }
}

    return (
        <div className="header-container">
            <div className="logo-container">
                <h1 className="header-title">Flourish</h1>
                <img src={Leaf} alt="green leaf" className="header-leaf" />
            </div>
            <div
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                <div
                    className="header-user-container"
                >
                    <p className="header-username">{username}</p>
                    <div className="header-user-icon-container">
                        {" "}
                        <img
                            src={Farmer}
                            alt=""
                            className="header-user-icon"
                        />{" "}
                    </div>
                </div>
            </div>
            <Collapse in={open}>
                <div className="header-user-collapse">
                    <button className="header-user-profile-btn" onClick={handleProfileClick}>Profile</button>
                    <button className="header-user-logout-btn" onClick={handleLogoutClick}>Logout</button>
                </div>
            </Collapse>
        </div>
    );
}

export default withRouter(Header);
