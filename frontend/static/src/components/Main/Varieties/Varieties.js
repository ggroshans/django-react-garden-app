import React from "react";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router";
import VarietiesDetail from "./VarietiesDetail";
import { NavLink } from "react-router-dom";
import "./Varieties.css";

function Varieties(props) {
    const [userGarden, setUserGarden] = useState();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        grabUserGarden();
        props.setShowNav(true);
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

    async function updateVarieties(variety) {
        console.log("variety", variety);

        const varieties = { ...userGarden.varieties };
        const key = Object.keys(variety)[0];

        if (varieties[key] === null || varieties[key] === undefined) {
            varieties[key] = [];
        }
        varieties[key].push({ [variety[key]]: "" });

        if (variety[key] !== "") {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookie.get("csrftoken"),
                },
                body: JSON.stringify({ varieties }),
            };
            const response = await fetch(
                `/api/gardens/${props.match.params.garden}/`,
                options
            );
            if (response.ok === false) {
                console.log("VARIETY PATCH FAILED", response);
            } else {
                const data = await response.json();
                setUserGarden((prevState) => ({
                    ...prevState,
                    varieties: varieties,
                }));
                console.log("VARIETY PATCH SUCCESS", data);
            }
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

    console.log("USERGARDEN", userGarden);

    return (
        <div className="varieties-container">
            {showAlert ? <div class="alert alert-success" role="alert">
                Variety Saved!
            </div> : <div></div>}
            <form action="" className="form-control varieties-form">
                {userGarden.vegetables_details.map((vegetable) => {
                    return (
                        <VarietiesDetail
                            {...vegetable}
                            updateVarieties={updateVarieties}
                            userGarden={userGarden}
                            setShowAlert={setShowAlert}
                        />
                    );
                })}
            </form>
            <NavLink to={`/${props.match.params.garden}/layout`}>
                <button className="btn btn-success flagship-btn varieties-continue-btn">
                    Continue
                </button>
            </NavLink>
        </div>
    );
}

export default withRouter(Varieties);
