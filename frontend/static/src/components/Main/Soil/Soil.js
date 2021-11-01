import "./Soil.css";
import React from "react";
import EsriLoaderReact from "esri-loader-react";
import Cookie from 'js-cookie';
import { useState, useEffect, useRef } from "react";

export default function Soil() {

    const [soil, setSoil] = useState(null);

    useEffect(() => {
        getSoilDetails();
     }, [soil] )

    const options = {
        url: "https://js.arcgis.com/4.21/",
    };

    function handleClick(e) {
    }

    async function getSoilDetails() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken')
            }
        }
        const response = await fetch (`/api/soils/?soil=${soil}`, options)
        if (response.ok === false) {
            console.log('failed', response)
        } else {
            const data = await response.json()
            console.log("SUCCESS", data)
        }
    }

    return (
        <div className="soil-container">
            <div className="map-view" onClick={handleClick} value={soil}>
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
                        let soilOrder
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
                                setSoil(soilOrder)
   
                            });
                        });

                        view.ui.add(locate, "top-left");
                    }}
                />
            </div>
            <div className="display-soil-container">
                <p className="display-soil-p">{soil}</p>
            </div>
        </div>
    );
}
