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

      mapData.current.on("click", (e) => {
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

          setMarkerData((prev) => [...prev, newMarker]);
        }
        if (e.originalEvent.shiftKey) {
          // center map on current location
          mapData.current?.setCenter(currentLocation);
        }
      });
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

  const removeMarkers = () => {
    // Remove markers
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
          .remove();
      });
    }
  };

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

  console.log(markerData);
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
