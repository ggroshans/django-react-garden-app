import React from "react";
import "./GardenItem.css"

export default function GardenItem(props) {

    function handleGardenItemClick() {
        
    }

    console.log("g-item props", props)

    return (
        <div className='garden-item-container'>
       
            <div className="garden-item" onClick={handleGardenItemClick}>
                <h3>{props.name}</h3>
                <p>Created: {props.created_at}</p>
                <p>Click for more details</p>
            </div>
        </div>
    );
}
