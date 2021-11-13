import React from "react";
import "./Instructions.css";
import Image1 from "../../../images/gardening1.jpeg";
import Image2 from "../../../images/gardening2.jpeg";
import Image3 from "../../../images/gardening3.jpeg";
import Image5 from "../../../images/gardening4.jpeg";
import Image4 from "../../../images/gardening5.jpeg";
import { withRouter, NavLink } from "react-router-dom";

function Instructions(props) {

    props.setShowNav(false);


    return (
        <div className="instructions-outer-container">
            <div className="instructions-inner-container">
                <div className="instructions-content-container">
                    <h1 className="instructions-main-heading">
                        Start to{" "}
                        <span className="instructions-flourish-span">
                            Flourish
                        </span>
                    </h1>
                    <h2 className="instructions-sub-heading">
                        Plan, organize and improve your garden.
                    </h2>
                    <div className="instructions-photo-grid">
                        <img className="instructions-image1" src={Image1} />
                        <img className="instructions-image2" src={Image2} />
                        <img className="instructions-image3" src={Image3} />
                        <img className="instructions-image4" src={Image4} />
                        <img className="instructions-image5" src={Image5} />
                    </div>
                    <p className="instructions-description">
                        Bountiful, high-yielding gardens are products of
                        thorough preparation. Flourish is a tool to help you
                        prepare your garden for the upcoming season, while
                        allowing you to cut down the time it takes to lay the
                        groundwork. The Flourish experience takes you through a
                        series of steps with each step focusing on important
                        gardening areas:{" "}
                        <span className="instructions-description-soil">
                            Soil
                        </span>
                        ,{" "}
                        <span className="instructions-description-vegetables">
                            Vegetables
                        </span>
                        ,{" "}
                        <span className="instructions-description-varieties">
                            Seed Varieties
                        </span>
                        , and{" "}
                        <span className="instructions-description-layout">
                            Physical Layout
                        </span>
                        .
                    </p>
                    <ol className="instruction-step-list">
                        <li className="instructions-list-step">
                            {" "}
                            <span className="instructions-step-soil splash-lobster-font">
                                1) Soil:
                            </span>{" "}
                            Find your soil type based on your desired location.
                            Using your specific soil type, we give your soil
                            characteristics and recommendtations for potential
                            improvements.
                        </li>
                        <li className="instructions-list-step">
                            {" "}
                            <span className="instructions-step-vegetables splash-lobster-font">
                                2) Vegetables:
                            </span>{" "}
                            Considering the varying conditions of your garden,
                            we allow you to filter against plant characteristics
                            so you can choose the most appropriate vegetables
                            specific areas of your garden.
                        </li>
                        <li className="instructions-list-step">
                            {" "}
                            <span className="instructions-step-varieties splash-lobster-font">
                                3) Seed Varieties:
                            </span>{" "}
                            Vegetables often do better if they are planted
                            alongside other plants; however, there can also be
                            plants you do not want to plant together. We help
                            find the best companion plants for your chosen
                            vegetables.
                        </li>
                        <li className="instructions-list-step">
                            {" "}
                            <span className="instructions-step-layout splash-lobster-font">
                                {" "}
                                4) Physical Layout:
                            </span>{" "}
                            Drafting the visual layout of your garden can be
                            highly beneficial for garden preparation. We allow
                            you to sketch an outline of your garden beds, while
                            providing an area for you to jot down important
                            notes.
                        </li>
                        {/* <li className="instructions-list-step">
                    {" "}
                    <span className="splash-list-summary">5) Summary:</span> After you have been given your soil characteristics and recommendtations, created your vegetable list, recruited additional vegetables for companion planting, and created a visual garden outline, you will recieve a summary of the garden plan you created.
                </li> */}
                    </ol>

                    <NavLink to={`/${props.match.params.garden}/soil`}>
                        <button
                            className="btn flagship-btn instructions-btn"
                        >
                            Continue
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}


export default withRouter(Instructions);