import "./NavBar.css"
import React from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

export default function NavBar(props) {

    const [radioValue, setRadioValue] = useState('');

    const radios = [
        { name: 'Soil', value: "soil" },
        { name: 'Vegetables', value: "vegetables" },
        { name: 'Companion Plants', value: "companion" },
        { name: 'Physical Layout', value: "layout" },
    ];

    function handleChange(e) {
        setRadioValue(e.currentTarget.value);
    }

    return (
        <div className="nav-btn-group">
            <ButtonGroup>
                {radios.map((radio, index) => (
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
                ))}
            </ButtonGroup>
        </div>
    )
}