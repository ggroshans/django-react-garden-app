import React from "react";
import "./Header.css";
import Leaf from "../../images/leaf.png";
import { Redirect, withRouter } from "react-router-dom";
import Cookie, { set } from "js-cookie";
import { useEffect, useState } from "react";
import Farmer from "../../images/farmer.png";
import { Button, Collapse, Spinner } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";

function Header(props) {
    const [username, setUsername] = useState();
    const [open, setOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [wikiData, setWikiData] = useState();

    const [randomPage, setRandomPage] = useState();

    useEffect(() => {
        getWikiData();
    }, []);

    useEffect(() => {
        // randomWikiPage(wikiData);
    }, [wikiData]);

    useEffect(() => {
        grabUserName();
    }, [username, props]);

    async function grabUserName() {
        console.log("1111fired");
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

    function handleProfileClick() {
        props.history.push("/gardenlist/");
        setOpen(false);
    }

    async function handleLogoutClick() {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch("/rest-auth/logout/", options);
        if (response.ok === false) {
            console.log("LOGOUT FAILED", response);
        } else {
            const data = await response.json();
            Cookie.remove("Authorization");
            console.log("LOGOUT SUCCESSFUL", data);
            props.history.push("/");
            props.setIsAuth(false);
            setOpen(false);
            setUsername("");
        }
    }

    async function getWikiData() {
        let pageNumbers;
        const response1 = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=categorymembers&cmtitle=Category%3ABotany&cmlimit=200`
        );
        if (response1.ok === false) {
            console.log("failed", response1);
        } else {
            const data = await response1.json();
            console.log("SUCCESS", data);
            pageNumbers = data.query.categorymembers.map((pageObj) => {
                return pageObj.pageid;
            });
        }

        const response2 = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=categorymembers&cmtitle=Category%3ASoil&cmlimit=200`
        );
        if (response2.ok === false) {
            console.log("failed", response2);
        } else {
            const data = await response2.json();
            console.log("SUCCESS", data);
            data.query.categorymembers.forEach((pageObj) => {
                return pageNumbers.push(pageObj.pageid);
            });

            if (wikiData) {
                setWikiData([...wikiData, pageNumbers]);
            } else {
                setWikiData(pageNumbers);
            }
        }
    }

    // function randomWikiPage(arr) {
    //     let index= Math.floor(Math.random() * arr.length);
    //     console.log(index)
    //     // let random = Number(randomPage[index])
    //     // setRandomPage(random)
    // }

    function handleWikiClick() {
        let index = Math.floor(Math.random() * wikiData.length);
        console.log(index);
        let random = Number(wikiData[index]);
        window.location.href=`https://en.wikipedia.org/w/index.php?curid=${random}`
    }

    function handleBannerClick() {
        props.history.push("/gardenlist");
    }

    if (!props.showHeader) {
        return "";
    }

    let navBar;
    if (props.isAuth && props.showNav) {
        navBar = <NavBar />;
    } else {
        navBar = "";
    }

    console.log(wikiData);

    return (
        <div className="header-container">
            <div
                className="logo-container"
                id={props.showNav ? "" : "header-center"}
                onClick={handleBannerClick}
            >
                <h1 className="header-title">Flourish</h1>
                <img src={Leaf} alt="green leaf" className="header-leaf" />
            </div>
            {props.isAuth && username ? (
                <>
                    <div
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <div className="header-user-container">
                            <p className="header-username">{username}</p>
                            <div className="header-user-icon-container">
                                {" "}
                                <img
                                    src={Farmer}
                                    alt=""
                                    className="header-user-icon"
                                />{" "}
                            </div>
                        </div>
                    </div>
                    <Collapse in={open}>
                        <div className="header-user-collapse">
                            <button
                                className="header-user-profile-btn"
                                onClick={handleProfileClick}
                            >
                                Profile
                            </button>
                            {/* {randomPage ? <a href={`https://en.wikipedia.org/w/index.php?curid=${randomPage}`}>WIKI</a> : ""} */}
                            <button className="header-user-wiki-btn" onClick={handleWikiClick}>Learn</button>
                            <button
                                className="header-user-logout-btn"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>
                        </div>
                    </Collapse>
                </>
            ) : (
                " "
            )}
            {navBar}
        </div>
    );
}

export default withRouter(Header);
