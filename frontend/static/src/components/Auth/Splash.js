import React from "react";
import "./Splash.css";
import { NavLink, Redirect } from "react-router-dom";
import { useEffect } from "react";
import Leaf from "../../images/leaf.png";

export default function Splash(props) {
    useEffect(() => {
        props.setShowHeader(false);
    }, []);

    if (props.isAuth) {
        return <Redirect to="/gardenlist" />;
    }

    return (
        <div className="splash-container">
            {/* <h1 className="splash-main-heading">
                Welcome to <span className="flourish-span">Flourish</span>
            </h1>
            <h2 className="splash-sub-heading">
                Plan, organize and improve your garden.
            </h2>
            <p className="splash-description">
                Bountiful, high-yielding gardens are products of thorough
                preparation. Flourish is a tool to help you prepare your garden
                for the upcoming season, while allowing you to cut down the time
                it takes to lay the groundwork. The Flourish experience takes
                you through a series of steps with each step focusing on
                important gardening areas: <span className="splash-soil">Soil</span>, <span className="splash-vegetables">Vegetables</span>, <span className="splash-companion">Companion Planting</span>,
                and  <span className="splash-layout">Physical Layout</span>.
            </p>

            <div className="splash-btn-group">
            <NavLink to="/login">
                <button
                    className="btn btn-success mt-2 flagship-btn"
                    value="login"
                >
                    Login
                </button>
            </NavLink>
            <NavLink to="/registration">
                <button
                    className="btn btn-success mt-2 flagship-btn"
                    value="register"
                >
                    Register
                </button>
                </NavLink>
            </div> */}

            <div className="splash1 position-relative w-100">
                <div className="splash2 position-absolute text-white d-flex flex-column align-items-start justify-content-center">
                    <div className="container">
                        <div class="col-md-6">
                            {/* <span className="splash-subheading text-uppercase">
                                Plan, organize, cultivate
                            </span> */}
                            <h1 className="splash-name mb-4 mt-2 display-4 font-weight-bold">
                                Welcome to
                                <span className="splash-headline">
                                    Flourish 
                                    <img src={Leaf} alt="green leaf" className="header-leaf splash-leaf" />
                                </span>
                            </h1>
                            <p className="splash-p">
                                Flourish is a tool to help you prepare your
                                garden for the upcoming season, while allowing
                                you to cut down the time it takes to lay the
                                groundwork.
                            </p>
                            <div className="mt-5">
                            <NavLink to="/registration" className="splash-navlink">
                                <a
                                    href="#"
                                    className="green-btn btn mt-3 mx-3 mt-sm-0"
                                >
                                    Register
                                </a>
                                </NavLink>
                                <NavLink to="/login" className="splash-navlink">
                                <a
                                    href="#"
                                    className="green-btn btn mt-3 mt-sm-0"
                                >
                                    Login
                                </a>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
