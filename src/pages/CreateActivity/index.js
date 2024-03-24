import React, { useState, useEffect, useRef } from "react";
import { getCategories } from "../../service/categoryService";
import { createNewActivity } from "../../service/activityService";
import "./createActivity.scss";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js"; // Import like this for better bundling
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGtvdmVycmlkZSIsImEiOiJjbHRvcm9vZTQwbWZiMmlueWg0ajR4djJpIn0.4W0ZfV78s1w0swKNtLOYCA";

export default function CreateActivity() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activityDetails, setActivityDetails] = useState({});
  const [marker, setMarker] = useState(null);
  const [durationSelection, setDurationSelection] = useState(""); // This is either 'dateTime' or 'duration'
  const mapContainer = useRef(null);
  const mapData = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(activityDetails);
      let date = dateRef.current.value;
      let time = timeRef.current.value;
      let dateTime = new Date(`${date}T${time}`);
      console.log(dateTime);

      let inputData = {
        name: activityDetails.name,
        description: activityDetails.description,
        languages: [],
        location: [marker.getLngLat().lng, marker.getLngLat().lat],
        date: dateTime,
        start_time: 0,
        duration: 0,
        categories: [selectedCategory.id],
        marker_color: selectedCategory.color,
        price_rules: [],
        currency: "NOK",
        image_url: "",
        max_attendees: activityDetails.max_attendees,
      };
      console.log(inputData);

      const res = await createNewActivity(inputData);
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setActivityDetails({});
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res?.data ?? []);
    };
    fetchCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  // Build map
  useEffect(() => {
    if (!mapContainer.current) return; // Exit if the container is not ready

    let startLocation = [10.0388, 59.049];
    if (!mapData.current) {
      mapData.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        center: startLocation,
        zoom: 5,
        bearing: 0,
        pitch: 0,
      });

      mapData.current.on("style.load", () => {
        mapData.current.setConfigProperty("basemap", "lightPreset", "day");
      });
    }

    // Define the click handler as a named function
    const addMarkerOnClick = (e) => {
      let newPos = [e.lngLat.lng, e.lngLat.lat];
      setMarker((prevMarker) => {
        if (prevMarker) {
          prevMarker.setLngLat(newPos); // Update existing marker position
          return prevMarker;
        }

        console.log("Creating new marker");
        const newMarker = new mapboxgl.Marker({
          color: "#ccc",
        })
          .setLngLat(newPos)
          .addTo(mapData.current);
        return newMarker;
      });
    };

    // Remove previous click listeners to prevent duplicates
    mapData.current.off("click", addMarkerOnClick);

    // Attach the new click listener
    mapData.current.on("click", addMarkerOnClick);

    // Cleanup function
    return () => {
      if (mapData.current) {
        mapData.current.off("click", addMarkerOnClick);
        // Optionally, remove the marker from the map if you are cleaning up
        setMarker((currentMarker) => {
          if (currentMarker) {
            currentMarker.remove();
          }
          return null; // Reset marker state
        });
      }
    };
  }, [selectedCategory]); // Reruns the effect only if selectedCategory changes

  useEffect(() => {
    if (marker && selectedCategory) {
      let mark = marker.getElement();
      console.log(mark);
      // mark has a path inside the svg element that we can change
      mark.querySelector("path").style.fill = selectedCategory.color;
    }
  }, [marker, selectedCategory]);

  return (
    <div>
      <div id="activity_creator">
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            padding: "12px",
          }}
        >
          <h3>Categories</h3>
          {categories?.map((category) => {
            return (
              <div
                key={category._id}
                style={{
                  border: "1px solid #ccc",
                  display: "grid",
                  gridTemplateColumns: "auto 30px",
                  backgroundColor:
                    selectedCategory?.id === category.id ? "#ccc" : "white",
                  padding: "8px",
                }}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                <span>{category.name}</span>
                <span
                  style={{
                    backgroundColor: category.color,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <i className="fas fa-palette"></i>
                </span>
              </div>
            );
          })}
        </div>
        <div ref={mapContainer} className="map__container"></div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            padding: "12px",
          }}
        >
          <h3>Activity Details</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={activityDetails?.name ?? ""}
              onChange={(e) =>
                setActivityDetails({ ...activityDetails, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={activityDetails?.description ?? ""}
              onChange={(e) =>
                setActivityDetails({
                  ...activityDetails,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" ref={dateRef} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="time" id="time" ref={timeRef} />
          </div>
          <div>
            <h4>Set Activity Duration</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setDurationSelection("dateTime");
                }}
                className={`duration__card ${
                  durationSelection === "dateTime" ? "active" : ""
                }`}
              >
                <span>Date time</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDurationSelection("duration");
                }}
                className={`duration__card ${
                  durationSelection === "duration" ? "active" : ""
                }`}
              >
                <span>Duration</span>
              </button>
            </div>
            <div className="duration__keeper">
              {durationSelection === "dateTime" ? (
                <>
                  <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" ref={dateRef} />
                  </div>
                  <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" ref={timeRef} />
                  </div>
                </>
              ) : (
                <div className="duration__container">
                  <div>
                    <span>Days</span>
                    <input type="text" />
                  </div>
                  <div>
                    <span>Hours</span>
                    <input type="text" />
                  </div>
                  <div>
                    <span>Minutes</span>
                    <input type="text" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="max_attendees">Max Attendees</label>
            <input
              type="number"
              id="max_attendees"
              value={activityDetails?.max_attendees ?? 1}
              onChange={(e) =>
                setActivityDetails({
                  ...activityDetails,
                  max_attendees: e.target.value,
                })
              }
            />
          </div>
          <button type="submit">Create Activity</button>
        </form>
      </div>
    </div>
  );
}
