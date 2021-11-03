import React from "react";
import "./FilteredVegetableList.css";

export default function FilteredVegetableList(props) {
    return (
        <div className="filtered-vegetables-container">
        <h2>Based on your search results:</h2>
            <div className="filtered-vegetables-grid-container">
                {props.filteredVegetables === undefined
                    ? ""
                    : props.filteredVegetables.map((vegetable) => {
                        if (props.userVegetables.some((element) => element.name === vegetable.name)){
                            console.log("true")
                            return (
                              <div className="filtered-vegetable already-added">
                                  <p className="filtered-vegetable-name">
                                      {vegetable.name}
                                  </p>

                              </div>
                          );
                        } else {
                            console.log("false")
                            return (
                              <div className="filtered-vegetable">
                                  <p className="filtered-vegetable-name">
                                      {vegetable.name}
                                  </p>
                                  <button
                                      className="filtered-add-vegetable"
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
