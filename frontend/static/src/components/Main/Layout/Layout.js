import React from "react";
import Companions from "./Companions";
import { useRef, useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Layout.css";
import Cookie from "js-cookie";

function Layout(props) {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 450 * 2;
        canvas.height = 600 * 2;
        canvas.style.width = `${450}px`;
        canvas.style.height = `${600}px`;

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
                "X-CSRFToken": Cookie.get('csrftoken')
            },
            body: formData,
        }
        const response = await fetch(`/api/gardens/${props.match.params.garden}/`, options);
        if (response.ok === false) {
            console.log("LAYOUT UPLOAD FAILED", response)
        } else {
            const data = await response.json()
            console.log("LAYOUT UPLOAD SUCCESS", data)
        }
    }

    async function handleSaveCanvas() {

        let imageBlob = await new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'));
        const formData = new FormData();
        formData.append('layout', imageBlob, 'image.png');
        postCanvasLayout(formData);
    }



    return (
        <div className="layout-container">
            <Companions/>
            <div className="canvas-container">
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    className="layout-canvas"
                />
                <button className="btn btn-success flagship-btn" onClick={handleSaveCanvas}>Save Sketch to Profile</button>
                <NavLink to={`/${props.match.params.garden}/summary`}><button className="btn btn-success flagship-btn">Continue</button></NavLink>
            </div>
        </div>
    );
}

export default withRouter(Layout);
