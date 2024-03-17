import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"; // Import like this for better bundling
import "./map.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGtvdmVycmlkZSIsImEiOiJjbHRvcm9vZTQwbWZiMmlueWg0ajR4djJpIn0.4W0ZfV78s1w0swKNtLOYCA";

export default function Map() {
  const [markerData, setMarkerData] = useState([]);
  const mapContainer = useRef(null);
  const mapData = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation([position.coords.longitude, position.coords.latitude]);
    });

    return () => {
      // Cleanup
      setCurrentLocation(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMarker = (e) => {
    if (e.originalEvent.ctrlKey) {
      var newMarker = {
        id: markerData.length + 1,
        name: "New Marker",
        coordinates: [e.lngLat.lng, e.lngLat.lat],
        categories: ["activity"],
        properties: {
          message: "New marker added!",
        },
      };

      setMarkerData([...markerData, newMarker]);
    }
    if (e.originalEvent.shiftKey) {
      // center map on current location
      mapData.current?.setCenter(currentLocation);
    }
  };

  useEffect(() => {
    if (mapContainer.current) {
      // Ensure the container is ready
      let startLocation = currentLocation || [
        10.038860415442773, 59.04914909437948,
      ];

      mapData.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        center: startLocation, // starting position [lng, lat]
        zoom: 17, // starting zoom
        bearing: 0,
        pitch: 45,
      });

      mapData.current.on("style.load", () => {
        mapData.current.setConfigProperty("basemap", "lightPreset", "dawn");
      });

      mapData.current.on("click", addMarker);

      mapData.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
          position: "bottom-right",
        })
      );
      mapData.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: true }),
        "top-right"
      );
    }
    return () => {
      // Cleanup
      mapContainer.current = null;
    };
  }, [markerData, currentLocation]);

  useEffect(() => {
    if (mapData.current) {
      console.log("adding markers");
      let currentMarkers = [...markerData];
      let hasChanged = false;
      if (currentMarkers?.length > 0) {
        for (let m of currentMarkers) {
          console.log("m", m);
          if (m.isAddedToMap === false) {
            var el = document.createElement("div");
            el.id = m.id;
            el.className = "marker";
            el.style.backgroundImage = "url(https://placekitten.com/g/30/30)";
            el.style.width = "30px";
            el.style.height = "30px";

            el.addEventListener("click", () => {
              window.alert(m.properties.message);
            });

            new mapboxgl.Marker(el)
              .setLngLat(m.coordinates)
              .addTo(mapData.current);
            m.isAddedToMap = true;
            hasChanged = true;
          }
        }
      }
      if (hasChanged) {
        setMarkerData(currentMarkers);
      }
    }
  }, [markerData]);

  console.log("markerData", markerData);

  const removeMarkers = () => {
    let currentMarkers = [...markerData];
    if (currentMarkers?.length > 0) {
      for (let m of currentMarkers) {
        let marker = document.getElementById(m.id);
        if (marker) {
          marker.remove();
        }
      }
    }
    setMarkerData([]);
  };

  return (
    <div
      style={{
        position: "relative",
        top: "0",
        left: "0",
        width: "100vw", // Corrected to viewport width
        height: "80vh", // Corrected to viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="mapContainer"
        ref={mapContainer}
        style={{
          height: "100%",
          width: "100%",
          top: "0",
          bottom: "0",
          position: "relative",
        }}
      ></div>
      <div id="toolbar">
        <button onClick={removeMarkers}>Clear Markers</button>
      </div>
    </div>
  );
}
