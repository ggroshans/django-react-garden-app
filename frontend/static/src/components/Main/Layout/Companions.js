import React from "react";
import { Spinner } from "react-bootstrap";
import Cookie from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router";
import "./Companions.css";

function Companions(props) {
    const [userVegetables, setUserVegetables] = useState();
    let [queryString, setQueryString] = useState("");
    // const [queryVegetable, setQueryVegetable] = useState();
    const firstRender1 = useRef(true)
    const firstRender2 = useRef(true)

    useEffect(() => {
        getGardenDetails();
    }, []);

    useEffect(() => {
        if (firstRender1.current) {
            firstRender1.current = false;
        } else {
            getVegetableDetails();
            
        }

    }, [queryString]);

    useEffect( ()=> {
        if (firstRender2.current) {
            firstRender2.current = false;
        } else {
            addNewVegetableToGarden();
        }
    },[userVegetables])

    function grabPKvalues(vegetables) {
        return vegetables.map(vegetable => vegetable.id)
        }

    async function getGardenDetails() {
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
            console.log("GET DETAILS FAILED", response);
        } else {
            const data = await response.json();
            console.log("GET DETAILS SUCCESS", data);
            setUserVegetables(data.vegetables_details);
        }
    }

    async function getVegetableDetails() {

        queryString = `name=${queryString}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(`/api/vegetables?${queryString}`, options);
        if (response.ok === false) {
            console.log("failed", response);
        } else {
            const data = await response.json();
            console.log("SUCCESS QUERY", data);
            let updatedGarden = [...userVegetables, data[0]]
            setUserVegetables(updatedGarden)
        }
    }

    function handleAddCompanion(e) {
        let val = e.target.value
        setQueryString(val.trim());
        console.log(queryString);
    }

    async function addNewVegetableToGarden() {
        let pkValues = grabPKvalues(userVegetables);

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: JSON.stringify({ vegetables: pkValues }),
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("VEG PATCH FAILED", response);
        } else {
            const data = await response.json();
            console.log('success yes', data)
        }
    }


    if (!userVegetables) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
    } else {
        console.log(userVegetables)
    }

    return (
        <div className="companions-container">
            <table>
                <thead>
                    <tr>
                        <th>Your Vegetable</th>
                        <th>Companions</th>
                        <th>Adversaries</th>
                    </tr>
                </thead>
                <tbody>
                    {userVegetables.length === 0
                        ? ""
                        : userVegetables.map((vegetable) => {
                              return (
                                  <tr>
                                      <td className="table-vegetable-name">
                                          <strong>{vegetable.name}</strong>
                                      </td>
                                      {vegetable.companions === null ? (
                                          <td>None</td>
                                      ) : (
                                          <td id="companion-list">
                                              {vegetable.companions
                                                  .split(",")
                                                  .map((companion) => {
                                                      return (
                                                          <button
                                                              value={companion}
                                                              onClick={
                                                                  handleAddCompanion
                                                              }
                                                          >
                                                              {companion}
                                                          </button>
                                                      );
                                                  })}
                                          </td>
                                      )}
                                      {vegetable.adversaries === null ? (
                                          <td>None</td>
                                      ) : (
                                          <td id="adversary-list">
                                              {vegetable.adversaries}
                                          </td>
                                      )}
                                  </tr>
                              );
                          })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}

export default withRouter(Companions);
