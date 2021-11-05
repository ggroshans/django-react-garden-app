import React from 'react';
import Cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';

function Varieties(props) {

    const [userGarden, setUserGarden] = useState();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        grabUserGarden();
    }, []);

    async function grabUserGarden() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(
            `/api/gardens/${props.match.params.garden}/`,
            options
        );
        if (response.ok === false) {
            console.log("GARDEN LIST FAIL", response);
        } else {
            const data = await response.json();
            setUserGarden(data);
        }
    }

    function handleChange(e) {
        let { name, value } = e.target;
        let updatedFormData = {...formData, [name]: value}
        setFormData(updatedFormData);
        console.log(formData)
    }

    if (!userGarden) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
    }

    console.log(userGarden)

    return (
        <div>
            <form action="" className="form-control">
                {userGarden.vegetables_details.map(vegetable => {

                    return (
                        <>
                        <div className="form-group variety-form-group">   
                            <p className="varieties-vegetable-name">Vegetable: {vegetable.name}</p>
                            <label className="varieties-variety-label label-form" htmlFor="variety"></label>
                            <input id="variety" name={vegetable.name} className="form-control" type="text" placeholder="Seed Variety" onChange={handleChange} />
                        </div>
                        </>
                    )
                })}
                <button className="btn btn-success flagship-btn">Submit Seed Varieties</button>
            </form>
        </div>
    )
}

export default withRouter(Varieties)