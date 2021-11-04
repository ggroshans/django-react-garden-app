import "./NavBar.css";
import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
    const [radioValue, setRadioValue] = useState("");

    const radios = [
        { name: "Soil", value: "soil" },
        { name: "Vegetables", value: "vegetables" },
        { name: "Plant Varieties", value: "varieties" },
        { name: "Physical Layout", value: "layout" },
    ];

    function handleChange(e) {
        setRadioValue(e.currentTarget.value);
    }

    return (
        <div className="navbar-container">
            <div className="nav-btn-group">
                <ButtonGroup>
                    {radios.map((radio, index) => (
                        <NavLink to={`/${radio.value}`} className="navbar-navlink">
                            <ToggleButton
                                className="nav-btn navbar-radio-btn"
                                key={uuidv4()}
                                id={`radio-${index}`}
                                type="radio"
                                variant="outline-success"
                                name="radio"
                                value={radio.value}
                                checked={radio.value == radioValue}
                                onChange={(e) => handleChange(e)}
                            >
                                {radio.name}
                            </ToggleButton>
                        </NavLink>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}
