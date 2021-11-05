import Cookie from "js-cookie";
import React from "react";
import { useState } from "react";
import { withRouter } from 'react-router-dom'

function VarietiesDetail(props) {
    console.log("PROOOOPS", props);

    const [formData, setFormData] = useState({ ...props, ["variety"]: "" });

    function handleChange(e) {
        let { value } = e.target;
        let updatedFormData = { ...formData, ["variety"]: value };
        setFormData(updatedFormData);
        console.log(formData);
    }

    console.log(props.varieties)

    async function handleSaveVariety(e) {
        e.preventDefault()

        let varietyData; 
        if (props.varieties === undefined) {
            console.log("fired-undefined")
            varietyData = [{[formData['name']]: formData.variety}]
        } else {
            console.log("fired-yo")
            varietyData = [...props.varieties, {[formData['name']]: formData.variety}]
        }

   
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get('csrftoken')
            },
            body: JSON.stringify({['varieties'] : varietyData})
        }
        const response = await fetch(`/api/gardens/${props.match.params.garden}/`, options)
        if (response.ok === false) {
            console.log('VARIETY PATCH FAILED', response)
        } else {
            const data = await response.json()
            console.log('VARIETY PATCH SUCCESS', data)
        }
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
                    name={props.name}
                    className="form-control varieities-detail-input"
                    type="text"
                    placeholder="Seed Variety"
                    value={formData.variety}
                    onChange={handleChange}
                />
                <button className="btn btn-success" onClick={handleSaveVariety}>Save</button>
            </div>
        </div>
    );
}

export default withRouter(VarietiesDetail)