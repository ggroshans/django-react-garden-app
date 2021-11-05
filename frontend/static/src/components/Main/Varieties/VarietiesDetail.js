import Cookie from "js-cookie";
import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function VarietiesDetail(props) {
    const [variety, setVariety] = useState("")
    // const [varietiesState, setVarietiesState] = useState();

    // useEffect(() => {
    //     getVarieties();
    // }, []);

    // useEffect( () => {
    //     POSTvarieties();
    // }, [varietiesState])

    // async function getVarieties() {
    //     const options = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "X-CSRFToken": Cookie.get("csrftoken"),
    //         },
    //     };
    //     const response = await fetch(
    //         `/api/gardens/${props.match.params.garden}/`,
    //         options
    //     );
    //     if (response.ok === false) {
    //         console.log("VARIETY GET FAILED", response);
    //     } else {
    //         const data = await response.json();
    //         setVarietiesState(data.varieties);
    //     }
    // }

    async function handleBlur(e) {
        e.preventDefault();
        const updatedVariety = {
            [props.name]: variety
        }
        props.updateVarieties(updatedVariety);
    }

    async function POSTvarieties() {

        // console.log(varietiesState)

        // const options = {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-CSRFToken": Cookie.get("csrftoken"),
        //     },
        //     body: JSON.stringify({ varieties: varietiesState }),
        // };
        // const response = await fetch(
        //     `/api/gardens/${props.match.params.garden}/`,
        //     options
        // );
        // if (response.ok === false) {
        //     console.log("VARIETY PATCH FAILED", response);
        // } else {
        //     const data = await response.json();
        //     console.log("VARIETY PATCH SUCCESS", data);
        // }
    }
    return (
        <div className="varieties-detail-container">
            <div className="form-group varieties-form-group">
                <p className="varieties-detail-name">Vegetable: {props.name}</p>
                <label
                    className="varieties-detail-label label-form"
                    htmlFor="variety"
                ></label>
                <input
                    id="variety"
                    value={variety}
                    name={props.name}
                    className="form-control varieities-detail-input"
                    type="text"
                    placeholder="Seed Variety"
                    onBlur={handleBlur}
                    onChange={(e) => setVariety(e.target.value)}
                />
            </div>
        </div>
    );
}

export default withRouter(VarietiesDetail);
