import React from 'react'
import './Header.css'
import Leaf from "../../images/leaf.png";

export default function Header() {
    return (
        <div className="header-container">
            <h1 className="header-title">Flourish</h1>
            <img src={Leaf} alt="green leaf" className="header-leaf" />
        </div>
    )
}
