import React from "react";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";
import "./WeatherDashboard.css";
import { Spinner } from "react-bootstrap";

function WeatherDashboard(props) {
    const [weatherData, setWeatherData] = useState();
    const [randomPage, setRandomPage] = useState();
    let sunrise;
    let sunset;
    let random;

    useEffect(() => {
        getWeatherDetails();
        // getWikiDetails();
    }, []);

    async function getWeatherDetails() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${props.userGarden.location.latitude.toFixed(
                2
            )}&lon=${props.userGarden.location.longitude.toFixed(
                2
            )}&&units=imperial&appid=e2dce036ff05079de8938acca0721d69`
        );
        if (response.ok === false) {
            console.log("failed", response);
        } else {
            let data = await response.json();

            console.log("SUCCESS", data);
            setWeatherData(data);
        }
    }

    // async function getWikiDetails() {
    //     const response = await fetch(
    //         `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=categorymembers&cmtitle=Category%3APhysics&cmlimit=20`
    //     );
    //     if (response.ok === false) {
    //         console.log("failed", response);
    //     } else {
    //         const data = await response.json();
    //         console.log("SUCCESS", data);
    //         let pageNumbers = data.query.categorymembers.map(pageObj => {
    //             return pageObj.pageid
    //         })
    //         let index= Math.floor(Math.random() * arr.length);
    //         setRandomPage(pageNumbers[index])
    //     }
    // }

    if (!weatherData) {
        return (
            <Spinner
                animation="border"
                variant="success"
                className="garden-detail-spinner"
            />
        );
    } else {
        sunrise = new Date(weatherData.current.sunrise * 1000);
        sunset = new Date(weatherData.current.sunset * 1000);
        // random = randomPage()
    }
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return (
        <div className="weather-outer-container">
            <h2 className="garden-detail-heading-category weather-heading">
                Current Weather
            </h2>
            <div className="weather-inner-container">
                <div>
                    <p className="weather-current-temp">
                        {weatherData.current.temp.toFixed(0)}&#176;
                    </p>
                </div>
                <div className="weather-dew-feelslike-flex-container">
                    <div className="weather-dew-flex-container">
                        <p className="weather-dew-point-heading">Dew Point:</p>{" "}
                        <p className="weather-dew-point-temp">
                            {weatherData.current.dew_point.toFixed(0)}&#176;
                        </p>
                    </div>
                    <div className="weather-feelslike-flex-container">
                        <p className="weather-feelslike-heading">Feels like:</p>{" "}
                        <p className="weather-feels-like-temp">
                            {weatherData.current.feels_like.toFixed(0)}&#176;
                        </p>
                    </div>
                </div>


                <div className="weather-humidity-uvi-flex-container">
                    <div className="weather-humidity-flex-container">
                        <p className="weather-humidity-heading">Humidity:</p>{" "}
                        <p className="weather-humidity">
                            {weatherData.current.humidity.toFixed(0)}%
                        </p>
                    </div>
                    <div className="weather-uvi-flex-container">
                        <p className="weather-uvi-heading">UVI:</p>{" "}
                        <p className="weather-uvi">
                            {weatherData.current.uvi.toFixed(0)}
                        </p>
                    </div>
                </div>

                <div className="weather-desc-container">
                    {weatherData.current.weather.map((weather) => {
                        return (
                            <>
                                <img
                                    className="weather-icon"
                                    src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                />
                                <p className="weather-desc">
                                    {" "}
                                    {toTitleCase(weather.description)}
                                </p>
                            </>
                        );
                    })}
                </div>
                <div>{/* Sunrise: {sunrise} */}</div>

                {/* {wikiData ? <a href={`https://en.wikipedia.org/w/index.php?curid=${random}`}></a> : ""} */}
            </div>
        </div>
    );
}

export default WeatherDashboard;
