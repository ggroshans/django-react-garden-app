import React from "react";
import "./Vegetables.css";

export default function Vegetables() {
    return (
        <div className="vegetables-container">
            <h2>Pick Vegetables by Filtering:</h2>
            <form action="" className="form-control vegetables-form">
                <label htmlFor="sun-exposure">Sun Exposure</label>
                <select name="sun-exposure" id="">
                    <option value="both">Both</option>
                    <option value="full sun">Full Sun</option>
                    <option value="partial sun">Partial Sun</option>
                </select>

                <div className="vegetables-checkboxes-container">
                    <input
                        type="checkbox"
                        id="heat-tolerant"
                        name="heat-tolerant"
                        value="TRUE"
                    />
                    <label htmlFor="heat-tolerant">Heat Tolerant</label>
                    <input
                        type="checkbox"
                        id="drought-tolerant"
                        name="drought-tolerant"
                        value="TRUE"
                    />
                    <label htmlFor="drought-tolerant">Drought Tolerant</label>
                </div>
                <label htmlFor="life-cycle">Life Cycle</label>
                <select name="life-cycle" id="life-cycle">
                    <option value="">All</option>
                    <option value="annual">Annual</option>
                    <option value="partial sun">Biennial</option>
                    <option value="partial sun">Perennial</option>
                </select>
                <label htmlFor="seasonality">Seasonality</label>
                <select name="seasonality" id="">
                    <option value="both">Both</option>
                    <option value="cool-season">Cool Season</option>
                    <option value="warm-season">Warm Season</option>
                </select>
            </form>
        </div>
    );
}
