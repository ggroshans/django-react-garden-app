import React from "react";
import { useEffect, useState } from "react";
import "./Summary.css";
import Cookie from "js-cookie";
import { withRouter } from "react-router";
import { Spinner, Modal, Button } from "react-bootstrap";

function Summary(props) {
    const [userGarden, setUserGarden] = useState();

    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        grabUserGarden();
        props.setShowNav(true);
    }, []);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    function print() {
        window.print();
    }

    async function grabUserGarden() {
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
            console.log("GARDEN LIST FAIL", response);
        } else {
            const data = await response.json();
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

    console.log("SUMMARY PAGE GARDEN", userGarden);

    function handlePrintClick() {
        print();
    }

    return (
        <div className="summary-container">
            <div className="summary-report-container">
                <h2 className="summary-report-main-heading">
                    Garden Preparation Report
                </h2>
                <p className="summary-report-date">{userGarden.created_at}</p>
                <div className="summary-soil-container">
                    <h3>Soil</h3>
                    <p>
                        <strong>Characteristics:</strong>{" "}
                        {userGarden.soil_details.characteristics}
                    </p>
                    <p>
                        <strong>Recommendations:</strong>{" "}
                        {userGarden.soil_details.recommendations}
                    </p>
                </div>{" "}
                <div className="summary-layout-container">
                    <h3>Layout</h3>
                </div>
                <div className="summary-vegetable-container">
                    {values.map((v, idx) => (
                        <Button
                            key={idx}
                            className="me-2 btn btn-success"
                            onClick={() => handleShow(v)}
                        >
                            Vegetables Table
                            {typeof v === "string" &&
                                `below ${v.split("-")[0]}`}
                        </Button>
                    ))}
                    <Modal
                        show={show}
                        fullscreen={fullscreen}
                        onHide={() => setShow(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Your Vegetables</Modal.Title>
                            <Button
                                className="btn btn-success summary-print-vegetables"
                                onClick={handlePrintClick}
                            >
                                Print Your Vegetables
                            </Button>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="summary-vegetable">
                                <table className="summary-table">
                                    <thead>
                                        <tr>
                                            <th>Your Vegetable</th>
                                            <th>Sun Exposure</th>
                                            <th>Heat Tolerant</th>
                                            <th>Drought Tolerant</th>
                                            <th>Life Cycle</th>
                                            <th>Seasonality</th>
                                            <th>Varieties</th>
                                            <th>Companions</th>
                                            <th>Adversaries</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userGarden.vegetables_details
                                            .length === 0
                                            ? ""
                                            : userGarden.vegetables_details.map(
                                                  (vegetable) => {
                                                      return (
                                                          <tr>
                                                              <td className="summary-td">
                                                                  <strong>
                                                                      {
                                                                          vegetable.name
                                                                      }
                                                                  </strong>
                                                              </td>
                                                              <td className="summary-td">
                                                                  {vegetable.exposure ===
                                                                  "BO"
                                                                      ? "Full Sun And/Or Partial Sun"
                                                                      : vegetable.exposure ===
                                                                        "FS"
                                                                      ? "Full Sun"
                                                                      : "Partial Sun"}
                                                              </td>
                                                              <td className="summary-td">
                                                                  {" "}
                                                                  {vegetable.heat_tolerant
                                                                      ? "Yes"
                                                                      : "No"}
                                                              </td>
                                                              <td className="summary-td">
                                                                  {vegetable.drought_tolerant
                                                                      ? "Yes"
                                                                      : "No"}
                                                              </td>
                                                              <td className="summary-td">
                                                                  {vegetable.seasonality ===
                                                                  "CS"
                                                                      ? "Cool-Season"
                                                                      : "Warm-Season"}
                                                              </td>
                                                              <td className="summary-td">
                                                                  {vegetable.life_cycle ===
                                                                  "AN"
                                                                      ? "Annual"
                                                                      : vegetable.life_cycle ===
                                                                        "BI"
                                                                      ? "Biennial"
                                                                      : "Perennial"}
                                                              </td>
                                                              <td className="summary-td">
                                                                  <span className="summary-category"></span>{" "}
                                                                  {userGarden.varieties ===
                                                                  null
                                                                      ? "None"
                                                                      : userGarden
                                                                            .varieties[
                                                                            vegetable
                                                                                .name
                                                                        ] ===
                                                                        undefined
                                                                      ? "None"
                                                                      : userGarden.varieties[
                                                                            vegetable
                                                                                .name
                                                                        ].map(
                                                                            (
                                                                                element
                                                                            ) => {
                                                                                let varietiesPerVegetable =
                                                                                    [];
                                                                                for (const prop in element) {
                                                                                    varietiesPerVegetable.push(
                                                                                        prop
                                                                                    );
                                                                                }
                                                                                return varietiesPerVegetable.map(
                                                                                    (
                                                                                        variety
                                                                                    ) => {
                                                                                        return (
                                                                                            <p>
                                                                                                {
                                                                                                    variety
                                                                                                }
                                                                                            </p>
                                                                                        );
                                                                                    }
                                                                                );
                                                                            }
                                                                        )}
                                                              </td>
                                                              {vegetable.companions ===
                                                              null ? (
                                                                  <td className="summary-td summary-td summary-companions">
                                                                      None
                                                                  </td>
                                                              ) : (
                                                                  <td className="companion-list">
                                                                      {
                                                                          vegetable.companions
                                                                      }
                                                                  </td>
                                                              )}
                                                              {vegetable.adversaries ===
                                                              null ? (
                                                                  <td className="summary-td">
                                                                      None
                                                                  </td>
                                                              ) : (
                                                                  <td className="adversary-list summary-td">
                                                                      {
                                                                          vegetable.adversaries
                                                                      }
                                                                  </td>
                                                              )}
                                                          </tr>
                                                      );
                                                  }
                                              )}
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Summary);
