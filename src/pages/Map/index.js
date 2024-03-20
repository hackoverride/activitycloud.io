import React, { useRef, useEffect, useState } from "react";
import { getActivities } from "../../service/activityService";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"; // Import like this for better bundling
import "./map.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGtvdmVycmlkZSIsImEiOiJjbHRvcm9vZTQwbWZiMmlueWg0ajR4djJpIn0.4W0ZfV78s1w0swKNtLOYCA";

export default function Map() {
  const [activities, setActivities] = useState([]);
  const mapContainer = useRef(null);
  const mapData = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      let dateFrom = "2024-03-30";
      let dateUntil = "2024-04-30";
      try {
        const response = await getActivities(dateFrom, dateUntil);
        setActivities(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, []);

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
      let startLocation = currentLocation || [10.0388, 59.049];

      mapData.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        center: startLocation, // starting position [lng, lat]
        zoom: 13, // starting zoom
        bearing: 0,
        pitch: 40,
      });

      mapData.current.on("style.load", () => {
        mapData.current.setConfigProperty("basemap", "lightPreset", "dawn");
      });

      mapData.current.on("click", (e) => {
        console.log(e);
        console.log(e.lngLat);
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
  }, [currentLocation]);

  console.log(activities);

  useEffect(() => {
    if (mapData.current) {
      if (activities?.length > 0) {
        for (let a of activities) {
          let startTime = a.start_time;
          let startHour = Math.floor(startTime / 60);
          if (startHour < 10) {
            startHour = "0" + startHour;
          }
          let startMinute = startTime % 60;
          if (startMinute < 10) {
            startMinute = "0" + startMinute;
          }
          let date = a.date;
          // Date is now a string with a date in the format "YYYY-MM-DDT00:00:00.000Z" We need to just remove the time part
          date = date.split("T")[0];
          let startDate = new Date(date);
          startDate.setHours(startHour);
          startDate.setMinutes(startMinute);

          // a.duration is in nanoseconds
          let endTime = new Date(startDate);
          endTime.setMilliseconds(a.duration / 1000000);

          let displayedStart = startDate?.toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          let displayedEnd = endTime.toLocaleDateString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          new mapboxgl.Marker({
            color: "#FF5733",
          })
            .setLngLat([a.location.longitude, a.location.latitude])
            .setPopup(
              new mapboxgl.Popup()
                .setHTML(`<div class="activity__popup"><h3>${a?.name}</h3>
            <p>Start: ${displayedStart}<br/>End: ${displayedEnd}</p>
            <p class="activity__description">${a?.description}</p>
              <p>Available: ${a?.max_attendees}
              </p>
              <p>You will soon be able to use this feature</p>
              </div>`)
            )
            .addTo(mapData.current);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, mapData.current]);

  return (
    <div
      style={{
        position: "relative",
        top: "0",
        left: "0",
        width: "100vw", // Corrected to viewport width
        height: "83vh", // Corrected to viewport height
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
    </div>
  );
}
