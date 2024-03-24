import { useContext, useState } from "react";
import SliderOverlay from "../../components/SliderOverlay";
import ActivityContext from "../../context/ActivityContext";
import Toast from "../../components/Toast";
import Loader from "../../components/Loader";
import { addToActivity } from "../../service/userService";

export default function ActivityOverlay({ activity }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    type: "",
    message: "",
    title: "",
  });
  const { fetchToken } = useContext(ActivityContext);
  if (!activity) {
    return <SliderOverlay></SliderOverlay>;
  }
  const addUserToActivityById = async () => {
    console.log("test");
    try {
      setLoading(true);
      let res = await addToActivity(activity.id, fetchToken());
      if (res?.status === 201) {
        setFeedback({
          show: true,
          type: "success",
          message: "Successfully added user to activity.",
          title: "Success",
        });
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        show: true,
        type: "error",
        message: "Failed to add user to activity.",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  let start = new Date(activity.date);
  let startTime = activity.start_time;
  let startHours = Math.floor(startTime / 60);
  let startMinutes = startTime % 60;
  start = new Date(start.setHours(startHours, startMinutes, 0, 0));
  let duration = activity.duration / 1000000;
  let end = new Date(start.getTime() + duration);

  return (
    <>
      <SliderOverlay>
        {activity?.image_url && (
          <img src={activity?.image_url} alt={activity?.name} />
        )}
        <h2>{activity?.name}</h2>
        <p className="activity__description">{activity?.description}</p>
        <p>
          <span>
            {start.toLocaleDateString("en", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <span>
            {end.toLocaleDateString("en", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </p>
        <h4>Maximum attendance: {activity?.max_attendees}</h4>
        {fetchToken() ? (
          <button className="activity__button" onClick={addUserToActivityById}>
            Add me to event
          </button>
        ) : (
          <span></span>
        )}
      </SliderOverlay>
      {feedback.show && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          title={feedback.title}
          close={() => {
            if (feedback.type === "success") {
              // Redirect to profile page - We do not persist login state. - as token is stored in local storage.
              window.location.href = "/profile";
            }
            setFeedback({ ...feedback, show: false });
          }}
        />
      )}
      {loading && <Loader />}
    </>
  );
}
