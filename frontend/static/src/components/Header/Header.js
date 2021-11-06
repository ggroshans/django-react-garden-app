import React from "react";
import "./Header.css";
import Leaf from "../../images/leaf.png";
import { Redirect, withRouter } from "react-router-dom";

function Header(props) {



    async function grabUserName() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        }
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("RENAME FAILED", response);
        } else {
            const data = await response.json();
            console.log("RENAME SUCCESS", data);
            setIsEditing(false);
            setUserGarden({ ...userGarden, ["name"]: rename });
        }
    }




    function handleClick() {
        if (props.isAuth) {
            props.history.push(`/gardenlist/`);
        } else {
            props.history.push(`/`)
        }
    }

    return (
        <div className="header-container">
            <div className="logo-container" onClick={handleClick}>
                <h1 className="header-title">Flourish</h1>
                <img
                    src={Leaf}
                    alt="green leaf"
                    className="header-leaf"
                />
            </div>
        </div>
    );
}

export default withRouter(Header);
