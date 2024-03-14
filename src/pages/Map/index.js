import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"; // Import like this for better bundling
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGtvdmVycmlkZSIsImEiOiJjbHRvcm9vZTQwbWZiMmlueWg0ajR4djJpIn0.4W0ZfV78s1w0swKNtLOYCA";

export default function Map() {
  const [markerData, setMarkerData] = useState([]); // [1
  const mapContainer = useRef(null);
  const mapData = useRef(null);

  useEffect(() => {
    if (mapContainer.current) {
      // Ensure the container is ready
      mapData.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        center: [10.038860415442773, 59.04914909437948], // starting position [lng, lat]
        zoom: 16, // starting zoom
        bearing: 0,
        pitch: 45,
      });

      mapData.current.on("style.load", () => {
        mapData.current.setConfigProperty("basemap", "lightPreset", "day");
      });

      mapData.current.on("click", (e) => {
        console.log(e.lngLat.toString());

        var newMarker = {
          id: markerData.length + 1,
          name: "New Marker",
          coordinates: [e.lngLat.lng, e.lngLat.lat],
          categories: ["category1"],
          properties: {
            message: "New marker added!",
          },
        };

        setMarkerData((prev) => [...prev, newMarker]);
      });
    }
    return () => {
      // Cleanup
      mapContainer.current = null;
    };
  }, []);

  // Add markers
  useEffect(() => {
    if (mapData.current) {
      markerData?.forEach((marker) => {
        console.log(marker);
        // Add markers to the map.

        new mapboxgl.Marker()
          .setLngLat(marker.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.name +
                  "</h3><p>" +
                  marker.properties.message +
                  "</p>"
              )
          )
          .addTo(mapData.current);
      });
    }
  }, [markerData]);

  console.log(markerData); // [2
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw", // Corrected to viewport width
        height: "100vh", // Corrected to viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="mapContainer"
        ref={mapContainer}
        style={{ height: "100%", width: "100%", position: "relative" }}
      ></div>
    </div>
  );
}
