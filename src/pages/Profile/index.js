import React, { useEffect, useState, useContext } from "react";
import ActivityContext from "../../context/ActivityContext";
import "./profile.scss";
import Toast from "../../components/Toast";
import { fetchProfileDataOnUser } from "../../service/userService";
import { clearToken } from "../../service/userService";
import DataTable from "react-data-table-component";

export default function Profile() {
  const [engagements, setEngagements] = useState([]);
  const [userData, setUserData] = useState({});
  const [ownedActivities, setOwnedActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    type: "",
    message: "",
    title: "",
  });
  const { fetchToken } = useContext(ActivityContext);

  useEffect(() => {
    const fetchEngagements = async () => {
      try {
        setLoading(true);
        const res = await fetchProfileDataOnUser(fetchToken());
        console.log(res?.data);
        setUserData(res?.data?.user ?? {});
        setEngagements(res?.data?.engagements ?? []);
        setOwnedActivities(res?.data?.owned_activities ?? []);
      } catch (err) {
        console.error(err);
        setFeedback({
          show: true,
          type: "error",
          message: "Failed to fetch engagements.",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEngagements();

    return () => {
      setEngagements([]);
    };
  }, [fetchToken]);

  const engagementsColumns = [
    {
      name: "Date",
      sortable: true,
      selector: (r) => r.activity.date,
      format: (r) => {
        return new Date(r.activity.date).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "2-digit",
        });
      },
    },
    {
      name: "Activity",
      selector: (r) => r.activity.name,
      sortable: true,
      format: (r) => {
        return <a href={`/map/${r.activity.id}`}>{r.activity.name}</a>;
      },
    },
    {
      name: "Time",
      selector: (r) => r.activity.start_time,
      format: (r) => {
        let hours = Math.floor(r.activity.start_time / 60);
        if (hours < 10) {
          hours = "0" + hours;
        }
        let minutes = r.activity.start_time % 60;
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        return `${hours}:${minutes}`;
      },
    },
  ];

  return (
    <div className="profile__container">
      <div className="toolbar">
        <span className="title">Profile</span>
        <div>
          <button
            className="cta__button"
            onClick={() => {
              // Clear token from local storage.
              clearToken();
              window.location.href = "/";
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <p>Welcome to your profile page.</p>
      <h3
        style={{
          padding: "20px",
          textAlign: "center",
          margin: "40px",
          color: "#f44336",
        }}
      >
        This site is in early development. Please be patient with us.
      </h3>
      <p>
        If you have any feedback, please let us know by clicking the feedback
        button in the bottom right corner of the page.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="two__column__container">
          <form
            className="content__container"
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h3>Profile</h3>
            <label>
              <span>Email</span>
              <input type="text" value={userData?.email} disabled />
            </label>
            <label>
              <span>First Name</span>
              <input type="text" value={userData?.first_name} disabled />
            </label>
            <label>
              <span>Last Name</span>
              <input type="text" value={userData?.last_name} disabled />
            </label>
            <label>
              <span>Phone</span>
              <div
                style={{ display: "grid", gridTemplateColumns: "60px auto" }}
              >
                <input type="text" value={userData?.phone_prefix} disabled />
                <input type="text" value={userData?.phone} disabled />
              </div>
            </label>
            <button type="submit">Update</button>
          </form>
          <div className="content__container">
            <h3>Your Activity Overview</h3>
            <div>
              <DataTable
                columns={engagementsColumns}
                data={engagements}
                progressPending={loading}
                dense
                striped
                pagination={engagements?.length > 10}
              />
            </div>
          </div>
        </div>
        <div className="content__container">
          <h3>Activities you own</h3>
          <DataTable
            actions={[
              <button
                className="cta__button"
                disabled={
                  typeof userData?.wallet === "undefined" ||
                  userData?.wallet < 1
                }
                onClick={() => {
                  window.location.href = "/create-activity";
                }}
              >
                <i className="fas fa-plus"></i>
                <span>Create</span>
              </button>,
            ]}
            columns={[
              { name: "Name", selector: (r) => r.name, sortable: true },
            ]}
            data={ownedActivities}
            progressPending={loading}
            dense
            striped
            pagination={ownedActivities?.length > 10}
          />
        </div>
      </div>
      {feedback.show && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          title={feedback.title}
          close={() => {
            setFeedback({ ...feedback, show: false });
          }}
        />
      )}
    </div>
  );
}
