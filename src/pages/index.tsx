import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ActivityHubProvider } from "../context/ActivityContext";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Feedback from "../components/Feedback";
import SliderOverlay from "../components/SliderOverlay";
export default function Home() {
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <main>
      <ActivityHubProvider value={{ setShowFeedback, showFeedback }}>
        <Nav />
        <Outlet />
        <Footer />
        <Feedback />
        {showFeedback && (
          <SliderOverlay>
            <h2 style={{ textAlign: "center" }}>Feedback</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p>
                We would love to hear your feedback! Please fill out the form
                below and let us know what you think.
              </p>
              <div>
                <textarea
                  id="feedback"
                  name="feedback"
                  style={{
                    width: "100%",
                    height: "140px",
                    resize: "none",
                    padding: "10px",
                  }}
                ></textarea>
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  border: "none",
                  backgroundColor: "rgb(190, 113, 12)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          </SliderOverlay>
        )}
      </ActivityHubProvider>
    </main>
  );
}
