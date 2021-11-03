import React from 'react'
import { useRef, useEffect, useState } from 'react'

export default function Companions() {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect( () => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

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
                <canvas 
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />
            </div>
        </div>
    )
}
