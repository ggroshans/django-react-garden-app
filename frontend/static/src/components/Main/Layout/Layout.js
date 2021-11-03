import React from 'react';
import { useRef, useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import './Layout.css';
import Cookie from 'js-cookie';

function Layout(props) {

    useEffect( () => {
        getGardenDetails();
    }, [])

    async function getGardenDetails() {

        const options = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "X-CSRFToken": Cookie.get('csrftoken')
            }
        }
        const response = await fetch (`/api/gardens/${props.match.params.garden}/`, options)
        if (response.ok === false) {
            console.log("GET DETAILS FAILED", response)
        } else {
            const data = await response.json()
            console.log("GET DETAILS SUCCESS", data)
        }
    }

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect( () => {
        const canvas = canvasRef.current
        canvas.width = 450 * 2;
        canvas.height = 600 * 2;
        canvas.style.width = `${450}px`;
        canvas.style.height = `${600}px`;

        const context = canvas.getContext("2d")
        context.scale(2,2);
        context.lineCap = "round";
        context.strokeStyle = "black"
        context.lineWidth = 5;
        contextRef.current = context;
    }, [])


    function startDrawing({nativeEvent}) {
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }
    function finishDrawing() {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    function draw({nativeEvent}) {
        if (!isDrawing) {return}
        const  {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }




    return (
        <div>
            <div className="canvas-container">
                <div className="layout-companions">
                    <h2>Companion Plants</h2>
                </div>
                <canvas 
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    className="layout-canvas"
                />
            </div>
        </div>
    )
}

export default withRouter(Layout);