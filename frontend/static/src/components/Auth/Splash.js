import React from "react";
import "./Splash.css";

export default function Splash() {
    function handleClickRegister() {}

    function handleClickLogin() {}

    return (
        <div className="splash-container">
            <h1 className="splash-main-heading">
                Welcome to <span className="flourish-span">Flourish</span>
            </h1>
            <h2 className="splash-sub-heading">
                Plan, organize and improve your garden.
            </h2>
            <p>
                Bountiful, high-yielding gardens are products of thorough
                preparation. Flourish is a tool to help you prepare your garden
                for the upcoming season, while allowing you to cut down the time
                it takes to lay the groundwork. The Flourish experience takes
                you through a series of steps with each step focusing on
                important gardening areas: Soil, Vegetables, Companion Planting
                and Physical Layout.
            </p>
            <ol className="splash-list">
                <li>
                    {" "}
                    1) <span className="splash-list-soil">SOIL:</span> Find your soil type based on your desired location.
                    Using your specific soil type, you will recieve soil
                    characteristics and recommendtations for potential
                    improvements.
                </li>
                <li>
                    {" "}
                    2) <span className="splash-list-vegetables">VEGETABLES:</span> Considering the varying conditions of your garden, we allow you to filter against plant characteristics so you can choose the most appropriate vegetables for your garden.
                </li>
                <li>
                    {" "}
                    3) <span className="splash-list-companion">COMPANION PLANTING:</span> Find your soil type based on your
                    desired location. Using your specific soil type, you will
                    recieve soil characteristics and recommendtations for
                    potential improvements.
                </li>
                <li>
                    {" "}
                    4) <span className="splash-list-layout">PHYSICAL LAYOUT:</span> Find your soil type based on your
                    desired location. Using your specific soil type, you will
                    recieve soil characteristics and recommendtations for
                    potential improvements.
                </li>
                <li>
                    {" "}
                    5) <span className="splash-list-summary">Summary:</span> Find your soil type based on your
                    desired location. Using your specific soil type, you will
                    recieve soil characteristics and recommendtations for
                    potential improvements.
                </li>
            </ol>
            <div className="splash-btn-group">
                <button
                    className="btn btn-success mt-2 flagship-btn"
                    value="login"
                    onClick={handleClickLogin}
                >
                    Login
                </button>
                <button
                    className="btn btn-success mt-3 flagship-btn"
                    value="register"
                    onClick={handleClickRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
}
