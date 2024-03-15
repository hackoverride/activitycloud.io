import React from "react";
import { useParams } from "react-router-dom";
export default function Activity() {
  const { id } = useParams();
  return (
    <div>
      <p>Information about one perticular activity</p>
      <p>Activity ID: {id}</p>
    </div>
  );
}
