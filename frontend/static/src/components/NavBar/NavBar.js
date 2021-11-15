import "./NavBar.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

function NavBar(props) {
    const [radioValue, setRadioValue] = useState("");

    const radios = [
        { name: "Soil", value: "soil" },
        { name: "Vegetables", value: "vegetables" },
        { name: "Seed Varieties", value: "varieties" },
        { name: "Physical Layout", value: "layout" },
    ];

    let paramValue;
    paramValue = props.location.pathname.split("/")[1]

    function handleChange(e) {
        setRadioValue(e.currentTarget.value);
    }


    return (
        <div className="navbar-container">
            <div className="nav-btn-group">
                    {radios.map((radio, index) => (
                        <NavLink to={`/${paramValue}/${radio.value}/`} className="navbar-link" activeClassName="active"
                                key={uuidv4()}
                                id={`radio-${index}`}
                                type="radio"
                                variant="outline-success"
                                name="radio"
                                value={radio.value}
                                checked={radio.value === radioValue}
                                onChange={(e) => handleChange(e)}
                            >
                                {radio.name}
                        </NavLink>
                    ))}
            </div>
        </div>
    )
}

export default withRouter(NavBar);