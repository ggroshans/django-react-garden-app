import React from 'react';
import { useEffect, useState } from 'react';
import './Summary.css';

export default function Summary(props) {

    useEffect(() => {
        props.setShowNav(true);
    }, []);

    return (
        <div className="summary-container">
            <div className="summary-report-container">

            </div>
        </div>
    )
}
