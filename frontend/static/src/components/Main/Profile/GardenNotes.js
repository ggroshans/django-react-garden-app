import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { withRouter } from "react-router";
import "./GardenNotes.css";
import { GrSend, GrFormEdit, GrFormClose } from "react-icons/gr";
import { IoIosAddCircle } from 'react-icons/io';

function GardenNotes(props) {
    const [notes, setNotes] = useState(["yo", "dude"]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(
            `/api/gardens/${props.userGardenID}/`,
            options
        );
        if (response.ok === false) {
            console.log("VARIETY PATCH FAILED", response);
        } else {
            const data = await response.json();
            if (data.notes !== null) {
                setNotes(data.notes);
            }
            console.log("VARIETY PATCH SUCCESS", data);
        }
    }

    function handleAddNote() {
        let updatedNotes = [...notes];
        updatedNotes.push(" ");
        setNotes(updatedNotes);
    }

    function handleChange(e, idx) {
        let updatedNotes = [...notes];
        updatedNotes[idx] = e.target.value;
        setNotes(updatedNotes);
        console.log(notes)
    }

    async function handleBlur() {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: JSON.stringify({ notes: notes }),
        };
        const response = await fetch(
            `/api/gardens/${props.userGardenID}/`,
            options
        );
        if (response.ok === false) {
            console.log("NOTES PATCH FAILED", response);
        } else {
            const data = await response.json();
            setNotes(data.notes);
            setIsEditing(false);
            console.log("NOTES PATCH SUCCESS", data);
        }
    }

    async function handleDeleteClick(idx) {
        let updatedNotes = [...notes];
        updatedNotes.splice(idx, 1);

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: JSON.stringify({ notes: updatedNotes }),
        };
        const response = await fetch(
            `/api/gardens/${props.userGardenID}/`,
            options
        );
        if (response.ok === false) {
            console.log("NOTES DELETE FAILED", response);
        } else {
            const data = await response.json();
            setNotes(data.notes);
            console.log("NOTES DELETE SUCCESS", data);
        }
    }

    function handleClick() {
        console.log('on click fired')
        setIsEditing(true)
    }


    return (
        <div className="garden-notes-container">
        <h2 className="garden-notes-heading">General Notes</h2>
            <IoIosAddCircle className="garden-notes-add-note-btn" onClick={handleAddNote}/>
            <ul>
                {notes.map((note, idx, arr) => {
                    return (
                        <>
                        {isEditing ? 
                        <li className="garden-notes-li">
                            <textarea className="garden-notes-textarea"type="text" value={notes[idx]} onChange={(e) => handleChange(e,idx)} onBlur={handleBlur} />
                            <div className="garden-notes-icon-container">
                                <GrFormClose
                                    value={idx}
                                    className="garden-notes-delete-btn"
                                    onClick={(idx) => handleDeleteClick(idx)}
                                />
                            </div>
                        </li> 
                        :
                        <li className="garden-notes-li" onClick={handleClick}>
                            <p className="garden-notes-input" >{note}</p>
                            <div className="garden-notes-icon-container">
                                <GrFormClose
                                    value={idx}
                                    className="garden-notes-delete-btn"
                                    onClick={(idx) => handleDeleteClick(idx)}
                                />
                            </div>
                        </li> }
                        </>
                    );
                })}
            </ul>
        </div>
    );
}

export default withRouter(GardenNotes);
