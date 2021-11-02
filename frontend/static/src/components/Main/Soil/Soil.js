import "./Soil.css";
import React from "react";
import EsriLoaderReact from "esri-loader-react";
import Cookie from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { Redirect, withRouter } from 'react-router-dom'

function Soil(props) {
    const firstRender = useRef(true);
    const [loaded, setLoaded] = useState(false)
    const [soil, setSoil] = useState({
        id: null,
        characteristics: "",
        recommendations: "",
        soil_order: "",
    });

    useEffect(() => {
        if (firstRender.current === true) {
            firstRender.current = false;
        } else {
            getSoilDetails()
        }
    }, [soil.soil_order]);

    const options = {
        url: "https://js.arcgis.com/4.21/",
    };

    async function getSoilDetails() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get("csrftoken"),
            },
        };
        const response = await fetch(`/api/soils/?soil=${soil.soil_order}`, options);
        if (response.ok === false) {
            console.log("failed", response);
        } else {
            const data = await response.json();
            console.log("SUCCESS", data);
            setSoil({
                ...soil,
                id: data[0].id,
                characteristics: data[0].characteristics,
                recommendations: data[0].recommendations,
            })
        }
    }


    async function handleSaveSoilClick() {

        const options  = {
            method: 'PATCH', 
            headers: {
                "Content-Type": 'application/json',
                "X-CSRFToken": Cookie.get('csrftoken')
            },
            body: JSON.stringify({soil: soil.id})
        }
        const response = await fetch(`/api/gardens/${props.match.params.garden}/`, options)
        if (!response.ok) {
            console.log("SOIL PATCH FAILED", response);
        } else {
            const data = await response.json();
            console.log("SOIL PATCH SUCCESS", data)
            props.history.push(`/${data.id}/vegetables/`)
        }
    }

    console.log(props.match.params.garden)



 setTimeout(() => {
     setLoaded(true);
 })

let esri;
if (loaded) {
    esri =             <div className="map-view">
    <EsriLoaderReact
        options={options}
        modulesToLoad={[
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/widgets/Locate",
            "esri/geometry/Point",
        ]}
        onReady={({
            loadedModules: [
                esriConfig,
                Map,
                MapView,
                FeatureLayer,
                Locate,
                Point,
            ],
            containerNode,
        }) => {
            esriConfig.apiKey =
                "AAPKe38b2bd343f04b5193e206b9ba79736dnppkQdQ1hschBAm1A2YPnEoOKzokq3zT2dGou2OnPIINpYr9LR7gfHPGHNy6Lcjy";

            const map = new Map({
                basemap: "arcgis-topographic",
            });

            const view = new MapView({
                container: containerNode,
                map: map,
                center: [-118.80543, 34.027],
                zoom: 13,
            });

            // const popupSoils = {
            //     title: "Soil Order",
            //     content: "<b>{esrisymbology}</b>"
            // };

            // Parks and open spaces (polygons)
            const soilsLayer = new FeatureLayer({
                url: "https://landscape11.arcgis.com/arcgis/rest/services/USA_Soils_Map_Units/featureserver/0",
                outFields: ["taxorder"],
                // popupTemplate: popupSoils
            });
            map.add(soilsLayer, 0);

            const locate = new Locate({
                view: view,
                useHeadingEnabled: false,
                goToOverride: function (view, options) {
                    options.target.scale = 1500;
                    return view.goTo(options.target);
                },
            });
            let soilOrder;
            view.on("immediate-click", (event) => {
                const latitude = event.mapPoint.latitude;
                const longitude = event.mapPoint.longitude;
                const screenPoint = view.toScreen(
                    new Point({ latitude, longitude })
                );
                view.hitTest(screenPoint).then((hitTestResult) => {
                    soilOrder =
                        hitTestResult.results[0].graphic.attributes
                            .esrisymbology;
                    setSoil({
                        id: null,
                        soil_order: soilOrder,
                        characteristics: "",
                        recommendations: "",
                    });
                });

            });

            view.ui.add(locate, "top-left");
        }}
    />
</div>
} else {
    esri = ""
}


    return (
        <div className="soil-container">
            {esri}
            <div className="display-soil-container">
                <p className="display-soil-p">{soil.soil_order}</p>
            </div>
            <div className="display-results-container">
                <div>
                    <h2>Characteristics:</h2>
                    <p>{soil.characteristics}</p>
                </div>
                <div>
                    <h2>Recommendations:</h2>
                    <p>{soil.recommendations}</p>
                </div>
            </div>
            <button id="soil-save-btn" className="btn btn-success flagship-btn" onClick={handleSaveSoilClick}>Save Soil Type</button>
        </div>
    );
}

export default withRouter(Soil);
