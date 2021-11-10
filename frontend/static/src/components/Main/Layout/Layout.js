import React from "react";
import Companions from "./Companions";
import { useRef, useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Layout.css";
import Cookie from "js-cookie";

function Layout(props) {
    useEffect(() => {
        props.setShowNav(true);
    }, []);

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 550 * 2;
        canvas.height = 650 * 2;
        canvas.style.width = `${550}px`;
        canvas.style.height = `${650}px`;

        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    function startDrawing({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }
    function finishDrawing() {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    function draw({ nativeEvent }) {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

    async function postCanvasLayout(formData) {
        const options = {
            method: "PATCH",
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: formData,
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("LAYOUT UPLOAD FAILED", response);
        } else {
            const data = await response.json();
            console.log("LAYOUT UPLOAD SUCCESS", data);
        }
    }

    async function handleSaveCanvas() {
        let imageBlob = await new Promise((resolve) =>
            canvasRef.current.toBlob(resolve, "image/png")
        );
        const formData = new FormData();
        formData.append("layout", imageBlob, "image.png");
        postCanvasLayout(formData);
    }

    function handleContinueClick() {
        props.history.push("/summary");
    }

    return (
        <div className="layout-outer-container">
            <div className="layout-inner-container">
                <div className="layout-heading-container">
                    {/* <h2 className="layout-heading">
                Time to Figure out your Layout!
            </h2> */}
                    <p className="layout-description">
                        <strong>In this step</strong>, you will find the
                        vegetables you have chosen in the table below along with
                        the vegetables best pairings (companions) and worse
                        pairings (adversaries). Use the companion chart to think
                        about how you want to lay out your garden. Then, use the
                        canvas to the right to sketch out the placement of your
                        beds and vegetables.
                    </p>
                </div>

                <div className="layout-flex-container">
                    <Companions />
                    <div className="canvas-container">
                        <canvas
                            onMouseDown={startDrawing}
                            onMouseUp={finishDrawing}
                            onMouseMove={draw}
                            ref={canvasRef}
                            className="layout-canvas"
                        />
                        <div className="layout-btn-container">
                            <button
                                className="btn flagship-btn"
                                onClick={handleSaveCanvas}
                            >
                                Save Sketch to Profile
                            </button>
                            <NavLink
                                to={`/${props.match.params.garden}/summary`}
                            >
                                <button
                                    className="btn flagship-btn"
                                    onClick={handleContinueClick}
                                >
                                    Continue
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Layout);
