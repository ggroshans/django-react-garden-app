import Cookie from "js-cookie";
import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

function VarietiesDetail(props) {
    const [variety, setVariety] = useState("");
    const [previousVarietyList, setPreviousVarietyList] = useState([]);

    useEffect(() => {
        findPreviousSavedVarieties();
    }, []);


    useEffect( ()=> {
        console.log('wassup')
        console.log(previousVarietyList)
    }, [previousVarietyList])


    async function handleBlur(e) {
        e.preventDefault();
        if (variety.length > 0) {
            const updatedVariety = {
                [props.name]: variety,
            };
            props.updateVarieties(updatedVariety);
            setVariety("");
            setPreviousVarietyList((prevState) => [...prevState, variety]);
            props.setShowAlert(true)
            setTimeout(() =>
            props.setShowAlert(false), 1500)
        }


    }

    async function findPreviousSavedVarieties() {
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
            console.log("FAILED", response);
        } else {
            const data = await response.json();
            console.log("SUCCESS FETCH ON VAR DETAIL", data);

            for (const property in data.varieties) {
                if (property === props.name) {
                    for (let i = 0; i < data.varieties[property].length; i++) {
                        for (let key in data.varieties[property][i]) {
                            setPreviousVarietyList((prevValue) => [
                                ...prevValue,
                                key,
                            ]);
                        }
                    }
                }
            }
        }
    }

    function handleDelete(idx) {
        props.deleteVariety(props.name, idx)
        let updatedState = [...previousVarietyList]
        updatedState.splice(idx, 1)
        console.log("UP", updatedState)
        setPreviousVarietyList(prevState => updatedState)
    }

    function handleKeyPress(e) {
        console.log('fired')
        console.log(e.key)
        if (e.key=== 'Enter') {
            console.log("blur fired")
            handleBlur(e)
        }
        
    }


    if (!props.userGarden) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
    }

    return (
        <div className="varieties-detail-container">
            <div className="form-group varieties-form-group">
                <p className="varieties-detail-name">Vegetable: {props.name}</p>
                <label
                    className="varieties-detail-label label-form"
                    htmlFor="variety"
                ></label>
                <ol>
                    {previousVarietyList.map((prevVariety, idx) => (
                        <li>{prevVariety} <AiOutlineClose onClick={() => handleDelete(idx)} value={idx}/></li>
                    ))}
                </ol>
                <input
                    id="variety"
                    value={variety}
                    name={props.name}
                    className="form-control varieities-detail-input"
                    type="text"
                    placeholder="Seed Variety"
                    onBlur={handleBlur}
                    onChange={(e) => setVariety(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </div>
        </div>
    );
}

export default withRouter(VarietiesDetail);
