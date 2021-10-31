import React from 'react';
import { useState } from 'react';
import './Registration.css';

export default function Registration() {

    const [data, setData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    })


    function handleChange(e) {
        let {name, value} = e.target
        let updatedData = {...data, [name]: value}
        setData(updatedData)
        console.log(data)
    }

    function handleSubmit() {}
     
    return (
        <div className="registration-container">
            <form className="form-control" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="username" className="form-label mt-3 registration-label">Username:</label>
                <input type="text" className="form-control" name="username" id="username" placeholder="Enter Username.." value={data.username} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label htmlFor="email" className="form-label mt-3 registration-label">Email:</label>
                <input type="email" className="form-control" name="email" id="email" placeholder="Enter Email.." value={data.email} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label htmlFor="password1" className="form-label mt-3 registration-label">Password:</label>
                <input type="password" className="form-control" name="password1" id="password1" placeholder="Enter Password.." value={data.password1} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label htmlFor="password2" className="form-label mt-3 registration-label">Confirm Password:</label>
                <input type="password" className="form-control" name="password2" id="password2" placeholder="Confirm Password.." value={data.password2} onChange={handleChange} />
            </div>
            <button className="btn btn-success mt-3">Submit</button>
            </form>
        </div>
    )
}
