import React from "react";
import { withRouter, Redirect } from "react-router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import "./GardenDetail.css";
import { Spinner, Button, Collapse, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import RichTextEditor from "./GardenNotes";
import WeatherDashboard from "./WeatherDashboard";

function GardenDetail(props) {
    const [userGarden, setUserGarden] = useState();
    // const [open, setOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [rename, setRename] = useState("");
    const [scrollView, setScrollView] = useState(false);

    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
        setScrollView(true);
    }

    useEffect(() => {
        grabUserGarden();
        props.setShowNav();
    }, []);

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

    function handleEditVegetablesClick() {
        props.history.push(`/${props.match.params.garden}/vegetables/`);
    }

    function handleEditSoilClick() {
        props.history.push(`/${props.match.params.garden}/soil/`);
    }

    function handleEditNameClick() {
        setIsEditing(true);
    }

    function handleChange(e) {
        setRename(e.target.value);
        console.log(rename);
    }

    function print() {
        window.print();
    }

    function handlePrintClick() {
        setScrollView(false);
        setTimeout(() => {
            print();
        });
        setTimeout(() => {
            setScrollView(true);
        });
    }

    async function handleRenameClick() {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
            body: JSON.stringify({ name: rename }),
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("RENAME FAILED", response);
        } else {
            const data = await response.json();
            console.log("RENAME SUCCESS", data);
            setIsEditing(false);
            setUserGarden({ ...userGarden, ["name"]: rename });
        }
    }

    function handleCloseRename() {
        setIsEditing(false);
    }

    function handleSummaryClick() {
        props.history.push(`/${props.match.params.garden}/summary/`);
    }

    function handleEditLayoutClick() {
        props.history.push(`/${props.match.params.garden}/layout`);
    }

    function handleEditVarietiesClick() {
        props.history.push(`/${props.match.params.garden}/varieties`);
    }

    function formatDate(date) {
        const splitDate = date.split("T")[0].split('-')
        const year = splitDate.shift();
        splitDate.push(year)
        return splitDate.join("-")
    }

    if (props.isAuth === false) {
        return <Redirect to="/" />
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
        <div className="garden-detail-outer-container">
            <div className="garden-detail-inner-container">
                <div className="garden-detail-background-container" id={show ? "hide" : ""}>
                    <div className="garden-detail-upper-body-container"></div>
                    {isEditing ? (
                        <div>
                            <h4 className="garden-detail-rename-heading">Update Garden Name:</h4>
                            <div className="garden-detail-rename-container">
                                <input
                                    type="text"
                                    value={rename}
                                    onChange={handleChange}
                                    className="form-control garden-detail-rename-input"
                                />
                                <button
                                    onClick={handleRenameClick}
                                    className="btn btn-success garden-detail-rename-btn"
                                >
                                    Rename
                                </button>
                                <button
                                    className="btn btn-danger garden-detail-close-rename-btn"
                                    onClick={handleCloseRename}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ) : (
                        <h3 className="garden-detail-garden-name">
                            {userGarden.name.toUpperCase()}{" "}
                            <FiEdit
                                className="garden-detail-edit-btn"
                                onClick={handleEditNameClick}
                            />
                        </h3>
                    )}
                    <p className="garden-detail-date">
                        Created: {formatDate(userGarden.created_at)}
                    </p>
                    <div className="garden-detail-body-container">
                        <div className="garden-detail-view-summary">
                            <p className="garden-detail-view-summary-p">
                                To view the summary report for this garden,
                                please click{" "}
                                <button
                                    className="garden-detail-summary-btn"
                                    onClick={handleSummaryClick}
                                >
                                    here
                                </button>
                                .
                            </p>
                        </div>
                        <div className="garden-detail-upper-container">
                            <div className="garden-detail-upper-right">
                                <RichTextEditor userGardenID={userGarden.id} />
                            </div>
                            <div className="garden-detail-weather-container">
                                <WeatherDashboard userGarden={userGarden} />
                            </div>
                        </div>
                        <div className="garden-detail-grid-container-2">
                            <div className="garden-detail-upper-left">
                                <h4 className="garden-detail-soil-heading garden-detail-heading-category">
                                    Soil{" "}
                                    <FiEdit
                                        className="garden-detail-edit-btn"
                                        onClick={handleEditSoilClick}
                                    />
                                </h4>
                                <div className="garden-detail-soil-subcontainer">
                                    <p>
                                        <strong className="garden-detail-strong-tag">
                                            Characteristics:{" "}
                                        </strong>
                                        {userGarden.soil_details === null
                                            ? "  Soil Type not selected"
                                            : userGarden.soil_details
                                                  .characteristics}
                                    </p>
                                    <p>
                                        <strong className="garden-detail-strong-tag">
                                            Recommendations:{" "}
                                        </strong>
                                        {userGarden.soil_details === null
                                            ? "  Soil Type not selected"
                                            : userGarden.soil_details
                                                  .recommendations}
                                    </p>

                                    {/* <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="btn btn-success flagship-btn"
                        >
                            Vegetables Card View
                        </Button> */}
                                </div>
                            </div>

                            <div className="garden-detail-layout-container-flex">
                                <h4 className="garden-detail-heading-category garden-detail-layout-heading">
                                    Layout{" "}
                                    <FiEdit
                                        className="garden-detail-edit-btn"
                                        onClick={handleEditLayoutClick}
                                    />
                                </h4>
                                <div className="garden-detail-layout-container">
                                <p className="garden-detail-layout-desc">
                                {"   "}You have sketched the following layout
                                        of your garden below. If you would like
                                        to download the sketch you drew, download it {" "}
                                        <span>
                                            <a
                                                href={userGarden.layout}
                                                download
                                                className="layout-download-image"
                                            >
                                                here!
                                            </a>{" "}
                                        </span>
                                    </p>
                                    <div className="garden-detail-image-container">
                                        <img
                                            src={userGarden.layout}
                                            className="garden-detail-layout-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="garden-detail-collapse-container">
                        <h3
                            className="garden-detail-heading-category"
                            id="garden-detail-vegetable-heading"
                        >
                            Vegetables{" "}
                            <FiEdit
                                className="garden-detail-vegetable-edit"
                                onClick={handleEditVegetablesClick}
                            />
                        </h3>
                        {values.map((v, idx) => (
                            <button
                                key={idx}
                                className="me-2 btn btn-success flagship-btn mt-4"
                                onClick={() => handleShow(v)}
                            >
                                Vegetables Table View
                                {typeof v === "string" &&
                                    `below ${v.split("-")[0]}`}
                            </button>
                        ))}
                        <div className="garden-detail-vegetable-grid-container">
                            {!show
                                ? userGarden.vegetables_details.map(
                                      (vegetable) => {
                                          return (
                                              <div className="garden-detail-vegetable">
                                                  <h5 className="garden-detail-vegetable-name">
                                                      {vegetable.name}
                                                  </h5>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Plant with:
                                                      </span>{" "}
                                                      {vegetable.companions}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Do NOT plant with:
                                                      </span>{" "}
                                                      {vegetable.adversaries}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Sun Exposure:
                                                      </span>{" "}
                                                      {vegetable.exposure ===
                                                      "BO"
                                                          ? "Full Sun And/Or Partial Sun"
                                                          : vegetable.exposure ===
                                                            "FS"
                                                          ? "Full Sun"
                                                          : "Partial Sun"}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Heat Tolerant:
                                                      </span>{" "}
                                                      {vegetable.heat_tolerant
                                                          ? "Yes"
                                                          : "No"}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Drought Tolerant:
                                                      </span>{" "}
                                                      {vegetable.drought_tolerant
                                                          ? "Yes"
                                                          : "No"}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Life Cycle:
                                                      </span>{" "}
                                                      {vegetable.life_cycle ===
                                                      "AN"
                                                          ? "Annual"
                                                          : vegetable.life_cycle ===
                                                            "BI"
                                                          ? "Biennial"
                                                          : "Perennial"}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                          Seasonality:
                                                      </span>{" "}
                                                      {vegetable.seasonality ===
                                                      "CS"
                                                          ? "Cool-Season"
                                                          : "Warm-Season"}
                                                  </p>
                                                  <p>
                                                      <span className="garden-detail-category">
                                                      <FiEdit
                                        className="garden-detail-edit-btn"
                                        onClick={handleEditVarietiesClick}
                                    /> Varieties :
                                                      </span>{" "}
                                                      {userGarden.varieties ===
                                                      null
                                                          ? ""
                                                          : userGarden
                                                                .varieties[
                                                                vegetable.name
                                                            ] === undefined
                                                          ? " "
                                                          : userGarden.varieties[
                                                                vegetable.name
                                                            ].map((element) => {
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
                                                                            <div>
                                                                                <p>
                                                                                    {
                                                                                        variety
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        );
                                                                    }
                                                                );
                                                            })}
                                                  </p>
                                              </div>
                                          );
                                      }
                                  )
                                : ""}
                        </div>
                    </div>
                </div>
            </div>

            <div className="summary-vegetable-container">
                <Modal
                    show={show}
                    fullscreen={fullscreen}
                    onHide={() => setShow(false)}
                    id={scrollView ? "scroll" : ""}
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
                                    {userGarden.vegetables_details.length === 0
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
                                                              <td
                                                                  className="companion-list"
                                                                  id="companion-list"
                                                              >
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
                                                              <td
                                                                  className="summary-td"
                                                                  id="adversary-list"
                                                              >
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
    );
}

export default withRouter(GardenDetail);
