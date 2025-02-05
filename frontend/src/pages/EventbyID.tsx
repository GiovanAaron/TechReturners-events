import React from "react";
import { useParams } from "react-router-dom";
import useApiReq from "../hooks/useApiReq"; // Import the API hook
import styles from "./pages.module.css";
import formatDateWithSuffix from "../utils/formatdatesuffix";
import LargeEvent from "../components/event-views/large-event/LargeEvent";

const EventbyID: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const {
    responseData: event,
    loading,
    error,
  } = useApiReq(
    `/events/${eventId}`, // Endpoint to fetch event by ID
    null, // No token required for public events
    "GET"
  );

  console.log("Fetched event data:", event);

  // Handle loading and errors
  if (loading) return <div>Loading event...</div>;
  if (error) return <div>Error fetching event: {error}</div>;
  if (!event) return <div>Event not found</div>;

  const fetchedEvent = event.event;

  return (
    <div className={styles.body}>
      <LargeEvent
        city={fetchedEvent.city}
        date={formatDateWithSuffix(fetchedEvent.start_datetime)}
        category={fetchedEvent.category}
        title={fetchedEvent.title}
        location_type={fetchedEvent.location_type}
        id={fetchedEvent.id}
        description={fetchedEvent.description}
        address={fetchedEvent.address}
        region={fetchedEvent.region}
        price={fetchedEvent.price == 0 ? "Free" : fetchedEvent.price}
        startTime={fetchedEvent.start_datetime}
        endTime={fetchedEvent.end_datetime}
        
      />
    </div>
  );
};

export default EventbyID;
