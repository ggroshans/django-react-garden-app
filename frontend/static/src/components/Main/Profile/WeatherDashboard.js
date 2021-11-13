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

    return (
        <div className="weather-outer-container">
                        <h2 className="garden-detail-heading-category">Today's Weather</h2>
            <div className="weather-inner-container">

                <p>
                    Current Temperature: {weatherData.current.temp.toFixed(0)}{" "}
                    degrees
                </p>
                <p>
                    Feels like: {weatherData.current.feels_like.toFixed(0)}{" "}
                </p>
                <div>
                    Dew Point: {weatherData.current.dew_point}
                </div>
                <div>
                    Forecast: 
                    {weatherData.current.weather.map(weather=> {
                        return (<><p>{weather.main} with {weather.description}</p></>
                        )
                    })}
                    
                </div>
                <div>{/* Sunrise: {sunrise} */}</div>

                {/* {wikiData ? <a href={`https://en.wikipedia.org/w/index.php?curid=${random}`}></a> : ""} */}
            </div>
        </div>
    );
}

export default WeatherDashboard;
