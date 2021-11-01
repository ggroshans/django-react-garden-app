import Cookie from 'js-cookie';
import React from 'react';
import { useState } from 'react';

export default function GetStarted() {

    const [data, setData] = useState({
        'garden-name': ""
    })

    function handleChange(e) {
        let {name, value} = e.target;
        let updatedData = {...data, [name]: value };
        setData(updatedData);
        console.log(data)
    }

    async function handleSubmit() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken')
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('/')
    }

    return (
        <div className='get-started-container'>
            <form className='form-control' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="garden-name">Garden Name:</label>
                    <input type="text" id="garden-name" name="garden-name" value={data['garden-name']} onChange={handleChange}/>
                </div>
                <button className="btn btn-success flagship-btn">Get Started!</button>
            </form>
        </div>
    )
}
