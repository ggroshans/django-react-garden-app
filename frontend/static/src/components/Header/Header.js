import React from "react";
import "./Header.css";
import Leaf from "../../images/leaf.png";
import { Redirect, withRouter } from "react-router-dom";

function Header(props) {
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
