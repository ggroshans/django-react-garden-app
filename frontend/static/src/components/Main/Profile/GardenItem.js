import React from "react";
import { withRouter } from "react-router";
import "./GardenItem.css";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';

function GardenItem(props) {


    function handleGardenItemClick(e) {
        props.history.push(`/gardenlist/${props.id}`);
    }

    function handleClick() {
        props.removeGardenFromList(props.id);
    }

    function formatDate(date) {
        const splitDate = date.split("T")[0].split('-')
        const year = splitDate.shift();
        splitDate.push(year)
        return splitDate.join("-")
    }

    

    return (
        <div className="garden-item-container" >
            <div className="garden-item-btn-container" >
                <AiOutlineClose onClick={handleClick}/>
            </div>
            <div className="garden-item-text-container" onClick={handleGardenItemClick}>
                <h3 className="garden-item-heading">{props.name.toUpperCase()}</h3>
                <p className="garden-item-date">{formatDate(props.created_at)}</p>
                <p
                    
                    className="garden-item-more-details"
                >
                </p>
            </div>
        </div>
    );
}

export default withRouter(GardenItem);
