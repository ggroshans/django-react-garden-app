import React from 'react';
import GardenItem from './GardenItem';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import "./GardenList.css"


export default function GardenList() {

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


    return (
        <div className="garden-list-container">
             <h2>Your Gardens:</h2>
             <div className="garden-list-grid-container">
             {userGardenList.map(element => {
                return <GardenItem {...element} />
            })}
             </div>
        </div>
    )
}
