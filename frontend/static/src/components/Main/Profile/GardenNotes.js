import React from "react";
import { useState } from 'react'

export default function GardenNotes() {

    const [notes, setNotes] = useState([
        "Note 1", "Note2", "Note3"
    ])

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

    function handleBlur() {
        
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
