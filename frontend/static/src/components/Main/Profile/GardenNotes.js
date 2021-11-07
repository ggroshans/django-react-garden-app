import React from "react";
import { useState, useEffect, useRef } from 'react';
import Cookie from 'js-cookie';
import { withRouter } from "react-router";
import './GardenNotes.css';
import {MdOutlineClose} from 'react-icons/md';

function GardenNotes(props) {
    const [notes, setNotes] = useState([" "]);
    const inputRef = useRef(null);

    useEffect( ()=> {
        fetchNotes();
    }, []);

    useEffect(() => { 
            inputRef.current.focus(); 
    }, [inputRef]);

    async function fetchNotes() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            }
        }
        const response = await fetch(
            `/api/gardens/${props.userGardenID}/`,
            options
        );
        if (response.ok === false) {
            console.log("VARIETY PATCH FAILED", response);
        } else {
            const data = await response.json();
            if(data.notes !== null) {
                setNotes(data.notes)
            }
            console.log("VARIETY PATCH SUCCESS", data);
        }
    }

    function handleAddNote() {
        let updatedNotes = [...notes]
        updatedNotes.push("");
        setNotes(updatedNotes)
    }

    function handleNoteChange(e, index) {
        let updatedNotes = [...notes]
        updatedNotes[index] = e.target.textContent;
        console.log(e.target.textContent)
        setNotes(updatedNotes)
    }

    async function handleBlur() {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: JSON.stringify({notes: notes}),
        };
        const response = await fetch(
            `/api/gardens/${props.userGardenID}/`,
            options
        );
        if (response.ok === false) {
            console.log("NOTES PATCH FAILED", response);
        } else {
            const data = await response.json();
            setNotes(data.notes)
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
            body: JSON.stringify({notes: updatedNotes}),
        };
        const response = await fetch(
            `/api/gardens/${props.userGardenID}/`,
            options
        );
        if (response.ok === false) {
            console.log("NOTES DELETE FAILED", response);
        } else {
            const data = await response.json();
            setNotes(data.notes)
            console.log("NOTES DELETE SUCCESS", data);
        }
    }

    return (
        <div className="garden-notes-container">
            <button className="btn btn-success" onClick={handleAddNote}>Add New Note</button>
                <ul>
                    {notes.map((note, idx) => {
                        return <li className="garden-notes-li"><span className="textarea garden-notes-bullet" role="textbox" type="text" onBlur={handleBlur} onInput={(e) => handleNoteChange(e, idx)} contentEditable ref={inputRef}>{note}</span><MdOutlineClose value={idx} className="garden-notes-delete-btn" onClick={(idx) => handleDeleteClick(idx)}/></li>
                    })}
                </ul>
        </div>
    );
}

export default withRouter(GardenNotes);