import React, { useEffect, useMemo , useState} from "react";
import SmallEvent from "../components/event-views/small-event/SmallEvent";
import useApiReq from "../hooks/useApiReq";  // Import the API hook
import styles from "./pages.module.css";
import formatDateWithSuffix from "../utils/formatdatesuffix";
import CreateEventBtn from "../components/buttons/create-event-btn/CreateEventBtn";
import hero_image from "../assets/hero_image.png"
import loading_animation from "../assets/loading_animation.gif"
import TestNotifModal from "../components/notifs/TestNotifModal";
import { genGoogleCalLink } from "../utils/googleCalFormat";



const Home: React.FC = () => {

  const [featureEvent, setFeatureEvent] = useState<any>({
  });


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
  console.log("first events", events);

  useEffect(() => {
    if (events && events.events) {
      const firstEvent = events.events[0];
      setFeatureEvent(firstEvent);
    }
  }, [events]);

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
        imgUrl1={event.photo_1_url}
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
        <h4>Next Event: {isNaN(new Date(featureEvent.start_datetime).getTime()) 
    ? "loading..." 
    : formatDateWithSuffix(featureEvent.start_datetime)}</h4>
        <button className={styles.freeTicketBtn}>
          <a target="_blank" href={genGoogleCalLink(
            featureEvent.startTime,
            featureEvent.endTime,
            featureEvent.title,
            featureEvent.description,
            featureEvent.address ?? "https://zoom.us/j/1234567890?pwd=abcdEFGHijkl"
          )}>Free TR {featureEvent.city ??"Virtual" } Ticket</a>
          </button>
        <div className={styles.divider}></div>
        <h4>Upcoming Events</h4>

        {/* Conditionally render loading, events or error message */}
        <div className={styles.smallEventsList}>
          {loading ? (
            <div>
            <img src={loading_animation} alt="loading animation" style={{ width: "5rem" }}/>
            <p>Loading events... This may take a few moments</p>
          </div>// Show loading only for events section
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

        <img src={hero_image} alt="hero image" className={styles.heroImage}></img>

        <TestNotifModal />
    </>
  );
};

export default Home;
