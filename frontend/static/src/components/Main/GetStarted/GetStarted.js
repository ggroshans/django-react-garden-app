import Cookie from 'js-cookie';
import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function GetStarted(props) {

    const [successfulPost, setSuccessfulPost] = useState(false)

    const [data, setData] = useState({
        'name': ""
    })

    function handleChange(e) {
        let {name, value} = e.target;
        let updatedData = {...data, [name]: value };
        setData(updatedData);
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken')
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('/api/gardens/', options)
        if (response.ok === false) {
            console.log("GARDEN NAME FAILED", response)
        } else {
            const data = await response.json()
            setSuccessfulPost(true);
            props.setCurrentGarden({
                created_at: data.created_at,
                id: data.id,
                name: data.name,
                username: data.username
            })
        }
    }

    if (successfulPost) {
        return <Redirect to="/soil" /> 
    }

    return (
        <div className='get-started-container'>
            <form className='form-control' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Garden Name:</label>
                    <input type="text" id="name" name="name" value={data['name']} onChange={handleChange}/>
                </div>
                <button className="btn btn-success flagship-btn">Get Started!</button>
            </form>
        </div>
    )
}
