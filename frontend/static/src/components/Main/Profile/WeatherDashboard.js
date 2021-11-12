import React from 'react';
import Cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import "./WeatherDashboard.css";
import { Spinner } from 'react-bootstrap';

function WeatherDashboard(props) {

    const [weatherData, setWeatherData] = useState()
    const [randomPage, setRandomPage] = useState()
    let sunrise;
    let sunset;
    let random;

    useEffect( ()=> {
        getWeatherDetails();
        // getWikiDetails();
    }, [])


    


    async function getWeatherDetails() {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${props.userGarden.location.latitude.toFixed(2)}&lon=${props.userGarden.location.longitude.toFixed(2)}&&units=imperial&appid=e2dce036ff05079de8938acca0721d69`
        );
        if (response.ok === false) {
            console.log("failed", response);
        } else {
            let data = await response.json();

            console.log("SUCCESS", data);
            setWeatherData(data) 
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
        sunrise = new Date(weatherData.daily[0].sunrise * 1000)
        sunset = new Date (weatherData.daily[0].sunset * 1000)
        // random = randomPage()
    }

    



    return (
        <div className="weather-container">
            <h2>Today's Weather</h2>
            <p>Current Temperature: {weatherData.current.temp.toFixed(0)} degrees</p>
            <div>
                High: {weatherData.daily[0].temp.max}
                Low: {weatherData.daily[0].temp.min}

            </div>
            <div>
                Forecast: {weatherData.daily[0].weather[0].main} ({weatherData.daily[0].weather[0].description})
            </div>
            <div>
                {/* Sunrise: {sunrise} */}
            </div>

            {/* {wikiData ? <a href={`https://en.wikipedia.org/w/index.php?curid=${random}`}></a> : ""} */}
        </div>
    )
}

export default WeatherDashboard;