import React from "react";

export default function GardenItem(props) {
    return (
        <div>
       
            <div className="garden-list">
                <h3>{props.name}</h3>
            </div>
        </div>
    );
}
