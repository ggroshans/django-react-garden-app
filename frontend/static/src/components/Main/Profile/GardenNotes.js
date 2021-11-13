import React from "react";
import { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { withRouter } from "react-router";
import "./GardenNotes.css";
import { GrSend, GrFormEdit, GrFormClose } from "react-icons/gr";
import { AiOutlineSave } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { IoIosAdd} from "react-icons/io";
import { MdOutlineClose} from "react-icons/md";

function GardenNotes(props) {
    const [notes, setNotes] = useState([" "]);

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
        console.log(notes);
    }

    // async function handleBlur() {
    //     const options = {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "X-CSRFToken": Cookie.get("csrftoken"),
    //         },
    //         body: JSON.stringify({ notes: notes }),
    //     };
    //     const response = await fetch(
    //         `/api/gardens/${props.userGardenID}/`,
    //         options
    //     );
    //     if (response.ok === false) {
    //         console.log("NOTES PATCH FAILED", response);
    //     } else {
    //         const data = await response.json();
    //         setNotes(data.notes);
    //         console.log("NOTES PATCH SUCCESS", data);
    //     }
    // }

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

    // function handleKeyPress(e) {
    //     console.log("fired");
    //     console.log(e.key);
    //     if (e.key === "Enter") {
    //         console.log("blur fired");
    //         handleBlur(e);
    //     }
    // }

    // function handleChange(e) {
    //     setNotes(e.target.value);
    // }

    async function handleSaveClick() {
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
            console.log("NOTES PATCH SUCCESS", data);
        }
    }

    function handleAddClick() {
        let updatedNotes = [...notes];
        updatedNotes.push(" ");
        setNotes(updatedNotes);
    }

    return (
        <div className="notepad">
            <div className="top">
                <IoIosAdd
                    className="garden-notes-add-btn"
                    onClick={handleAddClick}
                />
                <AiOutlineSave
                    className="garden-notes-save-btn"
                    onClick={handleSaveClick}
                />
            </div>
            {notes.map((note, idx) => (
                <div className="garden-note-container">
                <textarea
                    className="paper"
                    onChange={(e) => handleChange(e, idx)}
                    value={note}
               />
               <MdOutlineClose className="garden-notes-delete-btn" onClick={handleDeleteClick}/>
   </div>
            ))}
        </div>
    );
}

export default withRouter(GardenNotes);
