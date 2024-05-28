import { useEffect, useState } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "../icons/placeholder.png";

const tileOptions = {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};
const mapOptions = {
  center: [39.87021, 32.74518],
  zoom: 12,
};
const iconOptions = {
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
};
const immediateIcon = new L.Icon({
  iconUrl: markerIcon,
  ...iconOptions,
});
const LocationMap = ({ baseStation }) => {
  const [map, setMap] = useState(null);
  const [locationLayerId, setLocationLayerId] = useState(null);
  const [areaId, setAreaId] = useState(null);



  useEffect(() => {
    if (!map) {
      createMap();
    } else {
      createLayers();
    }
  }, [baseStation]);

  const createMap = () => {
    let _map = L.map("baseStationMap", {
      layers: [
        L.tileLayer(
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          tileOptions
        ),
      ],
      ...mapOptions,
    });

    let _locationLayer = L.featureGroup();
    let _locationArea = L.featureGroup();
    _map.addLayer(_locationLayer);
    _map.addLayer(_locationArea);
    setLocationLayerId(_locationLayer._leaflet_id);
    setAreaId(_locationArea._leaflet_id);
    setMap(_map);
  };

  const createLayers = () => {
    let _locationLayer = map._layers[locationLayerId];
    Object.values(_locationLayer._layers)?.forEach((layer) =>
      _locationLayer.removeLayer(layer)
    );
    let _locationArea = map._layers[areaId];
    Object.values(_locationArea._layers)?.forEach((layer) =>
      _locationArea.removeLayer(layer)
    );

    if (baseStation && baseStation.length > 0) {
      baseStation.forEach((el) => {
        _locationLayer.addLayer(createLocationMarker(el));
        _locationArea.addLayer(createLocationArea(el));
      });
    }

    let _locationLatlngs = Object.entries(_locationLayer._layers).map(
      (el) => el[1]._latlng
    );
    let latlngs = L.latLngBounds([..._locationLatlngs]);
    Object.keys(_locationLayer._layers).length > 0 &&
      latlngs.isValid() &&
      map.fitBounds(latlngs, { padding: [50, 50], maxZoom: 12 });
  };

  const createLocationMarker = (baseStation) => {
    return L.marker([baseStation.LAT, baseStation.LON], {
      icon: immediateIcon,
      radius: [baseStation.RANGE],
    });
  };
  

  

  const createLocationArea = (baseStation) => {
    return L.circle([baseStation.LAT, baseStation.LON],
       {
      radius: [baseStation.RANGE],

    }).bindPopup
    ("MCC değeri: " + baseStation.MCC
     + "<br>MNC değeri:" + baseStation.MNC
      + "<br>LAC değeri:" + baseStation.LAC 
      +"<br>CI değeri:" + baseStation.CI );
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: ".5em",
          overflow: "hidden",
        }}
        id="mapContainer"
      >
        <div
          id="baseStationMap"
          style={{ width: "100%", height: "520px" }}
        ></div>
      </div>
    </div>
  );
};
export default LocationMap;
