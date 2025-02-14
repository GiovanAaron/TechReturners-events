import React from "react";
import styles from "./pages.module.css";
import CreateEventTool from "../components/event-administration/create-event/CreateEventTool";


const CreateEvent: React.FC = () => {

    


  return (
    <div className={styles.body}>
      <h3>Post New Event</h3>
      <CreateEventTool />
    </div>
  );
};

export default CreateEvent;
