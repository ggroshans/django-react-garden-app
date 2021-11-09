import Cookie from "js-cookie";
import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import './VarietiesDetail.css'

function VarietiesDetail(props) {
    const [variety, setVariety] = useState("");
    const [previousVarietyList, setPreviousVarietyList] = useState([]);
    const [showInput, setShowInput] = useState(false);

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
            props.setShowSuccessAlert(true)
            setTimeout(() =>
            props.setShowSuccessAlert(false), 1500)
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

        props.setShowDeleteAlert(true)
            setTimeout(() =>
            props.setShowDeleteAlert(false), 1500)
    }

    function handleKeyPress(e) {
        console.log('fired')
        console.log(e.key)
        if (e.key=== 'Enter') {
            console.log("blur fired")
            handleBlur(e)
        }
    }

    function handleShowVarietyClick() {
        setShowInput(true)
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
        <div className={showInput || previousVarietyList.length > 0 ? 'varieties-detail-container increase-variety-size' : ''}>
            <div className="form-group varieties-form-group">
                <p className="varieties-detail-name">{props.name} {showInput ? "" : <IoIosAddCircle
                    className="varieties-detail-show-input-btn"
                    onClick={handleShowVarietyClick}
                />}</p>
                <ul>
                    {previousVarietyList.map((prevVariety, idx) => (
                        <li>{prevVariety} <AiOutlineClose onClick={() => handleDelete(idx)} value={idx} className="varieties-remove-btn" /></li>
                    ))}
                </ul>
                {showInput ? <input
                    id="variety"
                    value={variety}
                    name={props.name}
                    className="form-control varieties-detail-input"
                    type="text"
                    placeholder="Seed Variety"
                    onBlur={handleBlur}
                    onChange={(e) => setVariety(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
                /> : ""}
            </div>
        </div>
    );
}

export default withRouter(VarietiesDetail);
