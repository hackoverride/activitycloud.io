import React, { useContext } from "react";
import ActivityContext from "../../context/ActivityContext";
import "./feedback.scss";

export default function Feedback() {
  const { setShowFeedback, showFeedback } = useContext(ActivityContext);
  return (
    <div
      id="feedback__container"
      onClick={() => {
        setShowFeedback(!showFeedback);
      }}
    >
      <span>{showFeedback ? "Close" : "Feedback"}</span>
    </div>
  );
}
