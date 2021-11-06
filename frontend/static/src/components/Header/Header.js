import React from "react";
import "./Header.css";
import Leaf from "../../images/leaf.png";
import { Redirect, withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import Plant from "../../images/plant.png";

function Header(props) {
    const [username, setUsername] = useState("");

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

    function handleClick() {
        if (props.isAuth) {
            props.history.push(`/gardenlist/`);
        } else {
            props.history.push(`/`);
        }
    }

    function handleUserIconClick() {
        props.history.push('/gardenlist/')
    }

    return (
        <div className="header-container">
            <div className="logo-container" onClick={handleClick}>
                <h1 className="header-title">Flourish</h1>
                <img src={Leaf} alt="green leaf" className="header-leaf" />

            </div>
            <div className="header-user-container" onClick={handleUserIconClick}>
                    <p className="header-username">{username}</p>
                    <div className="header-user-icon-container">
                        {" "}
                        <img
                            src={Plant}
                            alt=""
                            className="header-user-icon"
                        />{" "}
                    </div>
                </div>
        </div>
    );
}

export default withRouter(Header);
