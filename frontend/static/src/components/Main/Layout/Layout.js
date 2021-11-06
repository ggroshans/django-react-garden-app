import React from "react";
import { useRef, useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Layout.css";
import Cookie from "js-cookie";

function Layout(props) {
    useEffect(() => {
        getGardenDetails();
    }, []);

    async function getGardenDetails() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("GET DETAILS FAILED", response);
        } else {
            const data = await response.json();
            console.log("GET DETAILS SUCCESS", data);
        }
    }

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

        // canvasRef.current.toBlob((blob) => {
            // formData.append('layout', blob);
        //     postCanvasLayout(formData);
        // }, 'image/png', 'image.pn');  

        let imageBlob = await new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'));
        const formData = new FormData();
        formData.append('layout', imageBlob, 'image.png');
        postCanvasLayout(formData)
        // const image = canvasRef.current.toDataURL('image/png');  
        // const blob = await (await fetch(image)).blob()
        // const blobURL = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = blobURL;
        // link.download = "image.png";
        // link.click()
    }

    // async function handleSaveCanvas() {
    //     canvasRef.current.toBlob(function(blob) {
    //       var newImg = document.createElement('img'),
    //           url = URL.createObjectURL(blob);
        
    //       newImg.onload = function() {
    //         URL.revokeObjectURL(url);
    //       };
    //       newImg.src = url;
    //       document.body.appendChild(newImg);
    //     }, 'image/jpeg', 0.95);
    // }



    return (
        <div className="layout-container">
            <div className="layout-companions">
                <h2>Companion Plants</h2>
            </div>
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
