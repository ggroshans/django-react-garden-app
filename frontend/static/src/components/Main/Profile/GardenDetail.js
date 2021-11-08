import React from "react";
import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import "./GardenDetail.css";
import { Spinner, Button, Collapse } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import RichTextEditor from "./GardenNotes";

function GardenDetail(props) {
    const [userGarden, setUserGarden] = useState();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [rename, setRename] = useState("");

    useEffect(() => {
        grabUserGarden();
        props.setShowNav();
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
    console.log(userGarden);

    function handleEditVegetablesClick() {
        props.history.push(`/${props.match.params.garden}/vegetables/`);
    }

    function handleEditSoilClick() {
        props.history.push(`/${props.match.params.garden}/soil/`);
    }

    function handleEditNameClick() {
        setIsEditing(true);
    }

    function handleChange(e) {
        setRename(e.target.value);
        console.log(rename);
    }

    async function handleRenameClick() {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: JSON.stringify({ name: rename }),
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("RENAME FAILED", response);
        } else {
            const data = await response.json();
            console.log("RENAME SUCCESS", data);
            setIsEditing(false);
            setUserGarden({ ...userGarden, ["name"]: rename });
        }
    }

    function handleCloseRename() {
        setIsEditing(false);
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
            <div className="garden-detail-upper-container">
                <div className="garden-detail-upper-left">
                    {isEditing ? (
                        <div>
                            <h4>Update Garden Name:</h4>
                            <div className="garden-detail-rename-container">
                            <input
                                type="text"
                                value={rename}
                                onChange={handleChange}
                                className="form-control garden-detail-rename-input"
                            />
                            <button
                                onClick={handleRenameClick}
                                className="btn btn-success garden-detail-rename-btn"
                            >
                                Rename
                            </button>
                            <button className="btn btn-danger garden-detail-close-rename-btn" onClick={handleCloseRename}>X</button>
                            </div>

                        </div>
                    ) : (
                        <h3>
                            {userGarden.name}
                            <FiEdit
                                className="garden-detail-edit-btn"
                                onClick={handleEditNameClick}
                            />
                        </h3>
                    )}
                    <p>Created: {userGarden.created_at}</p>
                    <h4>
                        Soil{" "}
                        <FiEdit
                            className="garden-detail-edit-btn"
                            onClick={handleEditSoilClick}
                        />
                    </h4>
                    <p>
                        <strong>Characteristics:</strong> 
                        {userGarden.soil_details === null ? "  Soil Type not selected" : userGarden.soil_details.characteristics}
                    </p>
                    <p>
                        <strong>Recommendations:</strong>
                        {userGarden.soil_details === null ? "  Soil Type not selected" : userGarden.soil_details.recommendations}
                    </p>
                    <h4>
                        Layout <FiEdit className="garden-detail-edit-btn" />
                    </h4>
                    <p>{userGarden.layout}</p>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className="btn btn-success flagship-btn"
                    >
                        Vegetables
                    </Button>
                </div>
                <div className="garden-detail-upper-right">   
                        
                        <RichTextEditor userGardenID={userGarden.id}/>
                </div>
            </div>

            <Collapse in={open}>
                <div className="garden-detail-collapse-container">
                    <button
                        className="btn btn-success flagship-btn garden-detail-edit-vegetables"
                        onClick={handleEditVegetablesClick}
                    >
                        Edit Vegetables
                    </button>
                    <div className="garden-detail-vegetable-grid-container">
                        {userGarden.vegetables_details.map((vegetable) => {
                            return (
                                <div className="garden-detail-vegetable">
                                    <h5 className="garden-detail-vegetable-name">{vegetable.name}</h5>
                                    <p><span className="garden-detail-category">Plant with:</span> {vegetable.companions}</p>
                                    <p>
                                        <span className="garden-detail-category">Do NOT plant with:</span>{" "}
                                        {vegetable.adversaries}
                                    </p>
                                    <p>
                                        <span className="garden-detail-category">Sun Exposure:</span>{" "}
                                        {vegetable.exposure === "BO"
                                            ? "Full Sun And/Or Partial Sun"
                                            : vegetable.exposure === "FS"
                                            ? "Full Sun"
                                            : "Partial Sun"}
                                    </p>
                                    <p>
                                        <span className="garden-detail-category">Heat Tolerant:</span>{" "}
                                        {vegetable.heat_tolerant ? "Yes" : "No"}
                                    </p>
                                    <p>
                                        <span className="garden-detail-category">Drought Tolerant:</span>{" "}
                                        {vegetable.drought_tolerant
                                            ? "Yes"
                                            : "No"}
                                    </p>
                                    <p>
                                        <span className="garden-detail-category">Life Cycle:</span>{" "}
                                        {vegetable.life_cycle === "AN"
                                            ? "Annual"
                                            : vegetable.life_cycle === "BI"
                                            ? "Biennial"
                                            : "Perennial"}
                                    </p>
                                    <p>
                                        <span className="garden-detail-category">Seasonality:</span>{" "}
                                        {vegetable.seasonality === "CS"
                                            ? "Cool-Season"
                                            : "Warm-Season"}
                                    </p>
                                    <p>
                                        <span className="garden-detail-category">Varieties:</span>{" "}
                                        {userGarden.varieties === null ? "" : userGarden.varieties[vegetable.name] === undefined ? " " : userGarden.varieties[
                                            vegetable.name
                                        ].map((element) => {
                                            let varietiesPerVegetable = [];
                                            for (const prop in element) {
                                                varietiesPerVegetable.push(
                                                    prop
                                                );
                                            }
                                            return varietiesPerVegetable.map(
                                                (variety) => {
                                                    return (
                                                        <div>
                                                            <p>{variety}</p>
                                                        </div>
                                                    );
                                                }
                                            );
                                        })}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default withRouter(GardenDetail);
