import React from "react";
import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import "./GardenDetail.css";

function GardenDetail(props) {
    const [userGarden, setUserGarden] = useState([]);

    useEffect(() => {
        grabUserGarden();
    }, []);

    async function grabUserGarden() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}`,
            options
        );
        if (response.ok === false) {
            console.log("GARDEN LIST FAIL", response);
        } else {
            const data = await response.json();
            console.log("GARDEN LIST SUCCESS", data);
            setUserGarden(data);
        }
    }

    return (
        <div className="garden-detail-container">
            <div className="garden-detail">
                <h3>{userGarden.name}</h3>
                <p>Created: {userGarden.created_at}</p>
                <p>Soil Type: {userGarden.soil}</p>
                <p>Layout: {userGarden.layout} </p>
                <h4>Vegetables:</h4>
                {userGarden.vegetables.map((vegetable) => {
                    return (
                        <div>
                            <h5>{vegetable.name}</h5>
                            <p>Plant with: {vegetable.companions}</p>
                            <p>Do NOT plant with: {vegetable.adversaries}</p>
                            <p>Sun Exposure: {vegetable.exposure === "BO" ? "Full Sun And/Or Partial Sun" : vegetable.exposure === "FS" ? "Full Sun" : "Partial Sun"
                            }</p>
                            <p>Heat Tolerant: {vegetable.heat_tolerant ? "Yes" : "No"}</p>
                            <p>Drought Tolerant: {vegetable.drought_tolerant ? "Yes" : "No"}</p>
                            <p>Life Cycle: {vegetable.life_cycle === "AN" ? "Annual" : vegetable.life_cycle === "BI" ? "Biennial" : "Perennial"}</p>
                            <p>Seasonality: {vegetable.seasonality === "CS" ? "Cool-Season" : "Warm-Season"}</p>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default withRouter(GardenDetail);
