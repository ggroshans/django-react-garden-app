import React from "react";
import GardenItem from "./GardenItem";
import CreateAGarden from "./CreateAGarden";
import Cookie, { remove } from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./GardenList.css";
import { withRouter } from "react-router";

function GardenList(props) {
    const [userGardenList, setUserGardenList] = useState([]);
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        grabUserGardenList();
        props.setShowNav(false);
        props.setShowHeader(true);
    }, []);

    useEffect(() => {
        grabUserName();
    }, [username, props]);

    async function grabUserName() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch("/rest-auth/user/", options);
        if (response.ok === false) {
            console.log("LOGIN FAILED", response);
        } else {
            const data = await response.json();
            Cookie.set("Authorization", `Token ${data.key}`);

            let username =
                data.username.charAt(0).toUpperCase() +
                data.username.slice(1).toLowerCase();
            setUsername(username);
        }
    }


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
            console.log("BEFORE", data)
            data.sort((a,b) => b.created_at-a.created_at)
            console.log("AFTER", data)
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

    if (!props.isAuth) {
        props.history.push("/");
    }

    return (
        <div className="garden-list-outer-container">
            <div className="garden-list-inner-container">
                <div className="garden-list-content-container">
                    <h2 className="garden-list-main-heading">
                        {username
                            ? username.toUpperCase() + "'S DASHBOARD"
                            : "DASHBOARD"}
                    </h2>
                    <button
                        className="green-btn create-garden-btn"
                        onClick={handleShow}
                    >
                        Create a Garden Plan
                    </button>
                    <Modal show={show} onHide={handleClose}>
                        <CreateAGarden handleClose={handleClose} />
                    </Modal>
                    {userGardenList.length === 0 ? (
                        ""
                    ) : (
                        <>
                            <h3 className="garden-list-subheading">
                                YOUR PAST GARDENS:
                            </h3>
                            <p className="garden-list-details-heading">
                                (Click a garden for more details!)
                            </p>
                        </>
                    )}
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
            </div>
        </div>
    );
}

export default withRouter(GardenList);
