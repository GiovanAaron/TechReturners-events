import React, { useMemo } from "react";
import SmallEvent from "../components/event-views/small-event/SmallEvent";
import useApiReq from "../hooks/useApiReq";  // Import the API hook
import styles from "./pages.module.css";
import formatDateWithSuffix from "../utils/formatdatesuffix";
import CreateEventBtn from "../components/buttons/create-event-btn/CreateEventBtn";
import hero_image from "../assets/hero_image.png"

const Home: React.FC = () => {

  // const token = localStorage.getItem("authToken");
  const access_type = localStorage.getItem("accessType");

  // Use useMemo to stabilize the headers object
  const headers = useMemo(() => ({}), []);

  const { responseData: events, loading, error } = useApiReq(
    "/events", // Endpoint to fetch events
    null, // No token required for public events
    "GET", // Method
    null, // No data for GET requests
    headers, // Stable headers object
    true // Automatically fetch data when the component mounts
  );

  console.log("loading", loading);
  console.log("error", error);
  console.log("events", events);

  const renderSmallEvents = (events: any) => {
    if (!events || !events.events) {
      return null; // Return null if events data is not available
    }

    // Shuffle the array randomly
    const shuffledEvents = events.events.sort(() => Math.random() - 0.5);

    // Select the first 5 events after shuffle
    return shuffledEvents.slice(0, 5).map((event: any, index: number) => (
      <SmallEvent
        key={index}
        city={event.city}
        date={formatDateWithSuffix(event.start_datetime)}
        category={event.category}
        title={event.title}
        location_type={event.location_type}
        id={event.id}
      />
    ));
  };

  return (
    <>
      {/* <HeaderNavBar /> */}
      <div className={styles.body}>
        <h4>The Job Fair for...</h4>
        <h4>Tech, AI & Digital Professionals</h4>
        <p style={{ maxWidth: "40rem" }}>
          {`Tech Jobs Fair connects over 60k+ attendees, 500+ companies and 400+ partners in 16 countries. It serves as a juncture for advancing careers and finding top talent in the AI, IT, and Digital industries, providing opportunities to engage with industry experts and network with professionals worldwide.`.replace(
            /  +/g,
            "\n"
          )}
        </p>
        <h4>Next Event: 14th of May 2025 13:09 to 19:00 (GMT)</h4>
        <button>Free TR Manchester Ticket</button>
        <div className={styles.divider}></div>
        <h4>Upcoming Events</h4>

        {/* Conditionally render loading, events or error message */}
        <div className={styles.smallEventsList}>
          {loading ? (
            <div>Loading events...</div> // Show loading only for events section
          ) : error ? (
            <div>Error fetching events: {error}</div> // Show error if any
          ) : (
            renderSmallEvents(events) // Render the events if fetched successfully
          )}
        </div>

          {access_type === "Admin" || access_type === "Moderator" ? <CreateEventBtn /> : null}

      </div>

        <img src={hero_image} alt="hero image" className={styles.heroImage}></img>
    </>
  );
};

export default Home;
