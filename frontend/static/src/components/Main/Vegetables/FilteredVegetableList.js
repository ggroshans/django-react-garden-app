import React from "react";
import "./FilteredVegetableList.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';





export default function FilteredVegetableList(props) {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);


    return (
        <div className="filtered-vegetables-container">
            {props.showNoResultsAlert ? <div
                className="filtered-vegetables-no-results alert alert-danger"
                role="alert"
            >
                NO RESULTS BASED ON YOUR SEARCH
            </div> : ""}
            {props.filteredVegetables.length === 0 ? (
                ""
            ) : (
                <h2 className="filtered-vegetables-heading">
                    BASED ON YOUR SEARCH:
                </h2>
            )}
            <div className="filtered-vegetables-grid-container">
                {props.filteredVegetables === undefined
                    ? ""
                    : props.filteredVegetables.map((vegetable) => {
                          if (
                              props.userVegetables.some(
                                  (element) => element.name === vegetable.name
                              )
                          ) {

                              return (
                                  <div
                                      className="filtered-vegetable already-added-container"
                                      key={uuidv4()}
                                  >
                                      <p className="filtered-vegetable-name already-added-heading">
                                          {vegetable.name}
                                      </p>
                                  </div>
                              );
                          } else {

                              return (
                                  <div
                                      className="filtered-vegetable"
                                      key={uuidv4()}
                                  >
                                      <p className="filtered-vegetable-name">
                                          {vegetable.name}
                                      </p>
                                      <button
                                          className="btn btn-success filtered-add-btn"
                                          onClick={() =>
                                              props.addToUserList(vegetable.id)
                                          }
                                      >
                                          Add
                                      </button>
                                  </div>
                              );
                          }
                      })}
            </div>
        </div>
    );
}
