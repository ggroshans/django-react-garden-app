import Cookie from "js-cookie";
import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function VarietiesDetail(props) {
    const [variety, setVariety] = useState("")

    async function handleBlur(e) {
        e.preventDefault();
        const updatedVariety = {
            [props.name]: variety
        }
        props.updateVarieties(updatedVariety);
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
