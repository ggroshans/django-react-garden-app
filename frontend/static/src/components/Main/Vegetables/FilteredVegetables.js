import React from "react";
import "./FilteredVegetables.css";

export default function FilteredVegetables(props) {
    return (
        <div className="filtered-vegetables-container">
            {props.userVegetables === undefined
                ? ""
                : props.userVegetables.map((vegetable) => {
                      return (
                          <div className="filtered-vegetable">
                              <p className="filtered-vegetable-name">{vegetable.name}</p>
                              <button className="filtered-add-vegetable">Add</button>
                          </div>
                      );
                  })}
            <button>Go Back to Search</button>
            <button>Continue to Next Step</button>
        </div>
    );
}
