import React from "react";
import { withRouter } from "react-router";
import "./GardenItem.css"

 function GardenItem(props) {

    function handleGardenItemClick(e) {
        props.history.push(`/gardenlist/${props.id}`);
    }

    console.log("g-item props", props)

    return (
        <div className='garden-item-container'>
       
            <button className="garden-item" value={props.id} onClick={handleGardenItemClick}>
                <h3>{props.name}</h3>
                <p>Created: {props.created_at}</p>
                <p>Click for more details</p>
            </button>
        </div>
    );
}

export default withRouter(GardenItem)