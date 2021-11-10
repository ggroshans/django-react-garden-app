import React from "react";
import "./FilteredVegetableList.css";
import { v4 as uuidv4 } from 'uuid';

export default function FilteredVegetableList(props) {
    return (
        <div className="filtered-vegetables-container">
        {props.filteredVegetables.length === 0 ? "" : <h2 className="filtered-vegetables-heading">BASED ON YOUR SEARCH:</h2>}
            <div className="filtered-vegetables-grid-container">
                {props.filteredVegetables === undefined
                    ? ""
                    : props.filteredVegetables.map((vegetable) => {
                        if (props.userVegetables.some((element) => element.name === vegetable.name)){
                            console.log("true")
                            return (
                              <div className="filtered-vegetable already-added" key={uuidv4()}>
                                  <p className="filtered-vegetable-name">
                                      {vegetable.name}
                                  </p>

                              </div>
                          );
                        } else {
                            console.log("false")
                            return (
                              <div className="filtered-vegetable" key={uuidv4()}>
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
