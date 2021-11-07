import React from "react";
import { Spinner } from "react-bootstrap";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "./Companions.css";

function Companions(props) {
    const [userGarden, setUserGarden] = useState();

    useEffect(() => {
        getGardenDetails();
    }, []);

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
            setUserGarden(data);
        }
    }

    if (!userGarden) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
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
                    {userGarden.vegetables_details.length === 0
                        ? ""
                        : userGarden.vegetables_details.map((vegetable) => {
                              return (
                                  <tr>
                                      <td>
                                          <strong>{vegetable.name}</strong>
                                      </td>
                                      {vegetable.companions === null ? <td>
                                          None
                                      </td> : <td className="companion-list">
                                          {vegetable.companions}
                                      </td>}
                                      {vegetable.adversaries === null ? <td>
                                          None
                                      </td> : <td className="adversary-list">
                                          {vegetable.adversaries}
                                      </td>}
                                  </tr>
                              );
                          })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    );
}

export default withRouter(Companions);
