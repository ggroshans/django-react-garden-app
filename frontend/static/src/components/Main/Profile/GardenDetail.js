import React from "react";
import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import "./GardenDetail.css";
import { Spinner, Button, Collapse } from "react-bootstrap";

function GardenDetail(props) {
    const [userGarden, setUserGarden] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        grabUserGarden();
    }, []);

    async function grabUserGarden() {
        console.log("here", props.match.params.garden);
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
            console.log("GARDEN LIST FAIL", response);
        } else {
            const data = await response.json();
            setUserGarden(data);
        }
    }

    if (!userGarden) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
    }

    return (
        <div className="garden-detail-container">
            <div className="garden-detail">
                <h3>{userGarden.name}</h3>
                <p>Created: {userGarden.created_at}</p>
                <p>Soil Type: {userGarden.soil}</p>
                <p>Layout: {userGarden.layout} </p>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Vegetables
                </Button>
                <Collapse in={open}>
                    <div className="garden-detail-vegetable-grid-container">
                        {userGarden.vegetables.map((vegetable) => {
                            return (
                                <div className="garden-detail-vegetable">
                                    <h5>{vegetable.name}</h5>
                                    <p>Plant with: {vegetable.companions}</p>
                                    <p>
                                        Do NOT plant with:{" "}
                                        {vegetable.adversaries}
                                    </p>
                                    <p>
                                        Sun Exposure:{" "}
                                        {vegetable.exposure === "BO"
                                            ? "Full Sun And/Or Partial Sun"
                                            : vegetable.exposure === "FS"
                                            ? "Full Sun"
                                            : "Partial Sun"}
                                    </p>
                                    <p>
                                        Heat Tolerant:{" "}
                                        {vegetable.heat_tolerant ? "Yes" : "No"}
                                    </p>
                                    <p>
                                        Drought Tolerant:{" "}
                                        {vegetable.drought_tolerant
                                            ? "Yes"
                                            : "No"}
                                    </p>
                                    <p>
                                        Life Cycle:{" "}
                                        {vegetable.life_cycle === "AN"
                                            ? "Annual"
                                            : vegetable.life_cycle === "BI"
                                            ? "Biennial"
                                            : "Perennial"}
                                    </p>
                                    <p>
                                        Seasonality:{" "}
                                        {vegetable.seasonality === "CS"
                                            ? "Cool-Season"
                                            : "Warm-Season"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default withRouter(GardenDetail);
