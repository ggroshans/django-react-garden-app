import React from 'react';
import Cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router';
import VarietiesDetail from './VarietiesDetail';

function Varieties(props) {

    const [userGarden, setUserGarden] = useState();


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



    if (!userGarden) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
    }


    return (
        <div>
            <form action="" className="form-control">
                {userGarden.vegetables_details.map(vegetable => {
                    return <VarietiesDetail {...vegetable} varieties={userGarden.varieties}/>
                })}
            </form>
        </div>
    )
}

export default withRouter(Varieties)