import React from "react";
import "./FilteredVegetableList.css";

export default function FilteredVegetableList(props) {
    return (
        <div className="filtered-vegetables-container">
            {props.filteredVegetables === undefined
                ? ""
                : props.filteredVegetables.map((vegetable) => {
                      return (
                          <div className="filtered-vegetable">
                              <p className="filtered-vegetable-name">{vegetable.name}</p>
                              <button className="filtered-add-vegetable" onClick={() => props.addToUserList(vegetable.id)}>Add</button>
                          </div>
                      );
                  })}
            <button>Go Back to Search</button>
            <button>Continue to Next Step</button>
        </div>
    );
}
