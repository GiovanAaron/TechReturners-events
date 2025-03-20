import React, { useMemo } from "react";
import SmallEvent from "../components/event-views/small-event/SmallEvent";
import useApiReq from "../hooks/useApiReq";  // Import the API hook
import styles from "./pages.module.css";
import formatDateWithSuffix from "../utils/formatdatesuffix";
import CreateEventBtn from "../components/buttons/create-event-btn/CreateEventBtn";
import loading_animation from "../assets/loading_animation.gif"


const AllEvents: React.FC = () => {

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

  // console.log("loading", loading);
  // console.log("error", error);
  // console.log("events", events);

  const renderSmallEvents = (events: any) => {
    if (!events || !events.events) {
      return null; // Return null if events data is not available
    }

    // Shuffle the array randomly

    // Select the first 5 events after shuffle
    return events.events.map((event: any, index: number) => (
      <SmallEvent
        key={index}
        city={event.city}
        date={formatDateWithSuffix(event.start_datetime)}
        category={event.category}
        title={event.title}
        location_type={event.location_type}
        id={event.id}
        imgUrl1={event.photo_1_url}
      />
    ));
  };

  return (
    <div className={styles.body}>
      <h3>All Events</h3>


      <div className={styles.smallEventsList}>
          {loading ? (
            <div><img src={loading_animation} alt="loading animation" style={{ width: "5rem" }}/>
            <p>Loading events... This may take a few moments</p></div> // Show loading only for events section
          ) : error ? (
            <div>Error fetching events: {error}</div> // Show error if any
          ) : (
            // Render the events if fetched successfully
            renderSmallEvents(events)
            // <div>Loading events...</div>

          )}
        </div>

        {access_type === "Admin" || access_type === "Moderator" ? <CreateEventBtn /> : null}

    </div>
  );
};

export default AllEvents;
