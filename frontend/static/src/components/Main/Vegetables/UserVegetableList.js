import React from 'react'
import "./UserVegetableList.css"

export default function UserVegetableList(props) {
    return (
        <div className="user-vegetable-list-container">
        <h2>Your Vegetables:</h2>
            <div className="user-vegetables-grid-container">
            {props.userVegetables === undefined
                ? ""
                : props.userVegetables.map((vegetable) => {
                      return (<>
                          {console.log("VEGGIE",vegetable)}
                          <div className="user-vegetable">
                              <p className="user-vegetable-name">{vegetable.name}</p>
                              <button className="user-add-vegetable" onClick={() => props.addToUserList(vegetable.id)}>Add</button>
                          </div></>
                      );
                  })}


            </div>
        </div>
    );
}
