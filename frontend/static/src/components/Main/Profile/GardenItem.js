import React from "react";
import { withRouter } from "react-router";
import "./GardenItem.css"
import {AiOutlineClose} from 'react-icons/ai';

 function GardenItem(props) {

    function handleGardenItemClick(e) {
        props.history.push(`/gardenlist/${props.id}`);
    }

    function handleClick() {
        props.removeGardenFromList(props.id)
    }

    return (
        <div className='garden-item-container'>
            <button className="garden-item" value={props.id} >
                <div className="garden-item-btn-container" onClick={handleClick}><AiOutlineClose/></div>
                <h3>{props.name}</h3>
                <p>Created: {props.created_at}</p>
                <p onClick={handleGardenItemClick} className="garden-item-more-details">Click for more details</p>
            </button>
        </div>
    );
}

export default withRouter(GardenItem)