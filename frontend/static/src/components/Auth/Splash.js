import React from "react";
import "./Splash.css";
import { NavLink, Redirect } from "react-router-dom";
import { useEffect } from 'react';

export default function Splash(props) {

    useEffect( ()=> {
        props.setShowHeader(false);
    }, [])

    if (props.isAuth) {
       return <Redirect to="/gardenlist" />
    }

    return (
        <div className="splash-container">
            <h1 className="splash-main-heading">
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
            {/* <ol className="splash-list">
                <li className="splash-list-step">
                    {" "}
                    <span className="splash-soil splash-lobster-font">1) Soil:</span> Find your soil type based on your desired location.
                    Using your specific soil type, we give your soil
                    characteristics and recommendtations for potential
                    improvements.
                </li>
                <li className="splash-list-step">
                    {" "}
                    <span className="splash-vegetables splash-lobster-font">2) Vegetables:</span> Considering the varying conditions of your garden, we allow you to filter against plant characteristics so you can choose the most appropriate vegetables specific areas of your garden.
                </li>
                <li className="splash-list-step">
                    {" "}
                    <span className="splash-companion splash-lobster-font">3) Companion Planting:</span> Vegetables often do better if they are planted alongside other plants; however, there can also be plants you do not want to plant together. We help find the best companion plants for your chosen vegetables. 
                </li>
                <li className="splash-list-step">
                    {" "}
                    <span className="splash-layout splash-lobster-font"> 4) Physical Layout:</span> Drafting the visual layout of your garden can be highly beneficial for garden preparation. We allow you to sketch an outline of your garden beds, while providing an area for you to jot down important notes.
                </li>

            </ol> */}
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
            </div>
        </div>
    );
}
