import React from "react";
import "./Header.css";
import Leaf from "../../images/leaf.png";
import { Redirect, withRouter } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import Farmer from "../../images/farmer.png";
import { Button, Collapse, Spinner } from "react-bootstrap";

function Header(props) {
    const [username, setUsername] = useState();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        grabUserName();
    }, [username, props]);

    async function grabUserName() {
        console.log("1111fired")
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

            let username = data.username.charAt(0).toUpperCase() + data.username.slice(1).toLowerCase();
            setUsername(username);
        }
    }

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
            Cookie.remove("Authorization");
            console.log("LOGOUT SUCCESSFUL", data);
            props.history.push("/");
            props.setIsAuth(false);
            setOpen(false);
            setUsername("");
        }
    }

    function handleBannerClick() {
        props.history.push('/gardenlist');
    }

    if (!props.showHeader) {
        return "";
    }


    return (
        <div className="header-container">
            <div className="logo-container" onClick={handleBannerClick}>
                <h1 className="header-title">Flourish</h1>
                <img src={Leaf} alt="green leaf" className="header-leaf" />
            </div>
            {(props.isAuth && username) ?
                <>
                    <div
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <div className="header-user-container">
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
                            <button
                                className="header-user-profile-btn"
                                onClick={handleProfileClick}
                            >
                                Profile
                            </button>
                            <button
                                className="header-user-logout-btn"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>
                        </div>
                    </Collapse>
                </>
            :
                " "
            }
        </div>
    );
}

export default withRouter(Header);
