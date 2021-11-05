import React from 'react';
import GardenItem from './GardenItem';
import Cookie, { remove } from 'js-cookie';
import { useEffect, useState } from 'react';
import "./GardenList.css"
import { withRouter } from 'react-router';


function GardenList(props) {

    const [userGardenList, setUserGardenList] = useState([])

    useEffect( () => {
        grabUserGardenList()
    }, [])

    async function grabUserGardenList() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken')
            }
        }
        const response = await fetch('/api/gardens/', options)
        if (response.ok === false) {
            console.log("GARDEN LIST FAIL", response)
        } else {
            const data = await response.json()
            console.log("GARDEN LIST SUCCESS", data)
            setUserGardenList(data)
        }
    }

    function handleAddGardenBtn() {
        props.history.push('/creategarden')
    }

   async function removeGardenFromList(id) {
        let index = userGardenList.findIndex(garden => garden.id === id);
        let updatedGardenList = [...userGardenList];
        updatedGardenList.splice(index,1);
        setUserGardenList(updatedGardenList)

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken')
            }
        }
        const response = await fetch(`/api/gardens/${id}/`, options)
        if (response.ok === false) {
            console.log("GARDEN LIST FAIL", response)
        } else {
            const data = await response.json()
            console.log("GARDEN LIST SUCCESS", data)
            
        }
    }


    return (
        <div className="garden-list-container">
            <button className="btn btn-success flagship-btn garden-list-add-btn" onClick={handleAddGardenBtn}>Create New Garden</button>
             <h2>Your Gardens:</h2>
             <div className="garden-list-grid-container">
             {userGardenList.map(element => {
                return <GardenItem {...element} removeGardenFromList={removeGardenFromList}/>
            })}
             </div>
        </div>
    )
}

export default withRouter(GardenList)