import React from "react";
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { withRouter } from "react-router";

function GardenNotes(props) {



    const [notes, setNotes] = useState([
        " "
    ])

    useEffect( ()=> {
        fetchNotes();
    }, [])

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
        updatedNotes[index] = e.target.value;
        setNotes(updatedNotes)
        console.log(notes)
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
            console.log("VARIETY PATCH FAILED", response);
        } else {
            const data = await response.json();
            setNotes(data.notes)
            console.log("VARIETY PATCH SUCCESS", data);
        }
    }

    return (
        <div>
            <section id="textarea" contenteditable="true">
            <button onClick={handleAddNote}>Add New Note</button>
                <ul>
                    {notes.map((note, idx) => {
                        return <li><textarea type="text" value={notes[idx]} onBlur={handleBlur} onChange={(e) => handleNoteChange(e, idx)}/></li>
                    })}
                </ul>
            </section>
        </div>
    );
}

export default withRouter(GardenNotes);