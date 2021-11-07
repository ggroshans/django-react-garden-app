import React from "react";
import GardenItem from "./GardenItem";
import CreateAGarden from './CreateAGarden';
import Cookie, { remove } from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import "./GardenList.css";
import { withRouter } from "react-router";

function GardenList(props) {
    const [userGardenList, setUserGardenList] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        grabUserGardenList();
    }, []);

    async function grabUserGardenList() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch("/api/gardens/", options);
        if (response.ok === false) {
            console.log("GARDEN LIST FAIL", response);
        } else {
            const data = await response.json();
            console.log("GARDEN LIST SUCCESS", data);
            setUserGardenList(data);
        }
    }

    async function removeGardenFromList(id) {
        let index = userGardenList.findIndex((garden) => garden.id === id);
        let updatedGardenList = [...userGardenList];
        updatedGardenList.splice(index, 1);
        setUserGardenList(updatedGardenList);

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(`/api/gardens/${id}/`, options);
        if (response.ok === false) {
            console.log("GARDEN LIST FAIL", response);
        } else {
            const data = await response.json();
            console.log("GARDEN LIST SUCCESS", data);
        }
    }
    console.log(props.isAuth);

    if (!props.isAuth) {
        props.history.push("/");
    }

    return (
        <div className="garden-list-container">
            <Button variant="btn btn-success flagship-btn" onClick={handleShow}>
Create a Garden
            </Button>
            <Modal show={show} onHide={handleClose}>
                <CreateAGarden handleClose={handleClose}/>
            </Modal>
            {userGardenList.length === 0 ? "" : <h2 className="garden-list-past-gardens">Your Past Gardens:</h2>}
            <div className="garden-list-grid-container">
                {userGardenList.map((element) => {
                    return (
                        <GardenItem
                            {...element}
                            removeGardenFromList={removeGardenFromList}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default withRouter(GardenList);
