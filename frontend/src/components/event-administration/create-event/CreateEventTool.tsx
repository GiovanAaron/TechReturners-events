import { FunctionComponent, useState, useContext } from "react";
import styles from "./CreateEventTool.module.css";

const CreateEventTool: FunctionComponent = () => {
  return (
    <div className={styles.loginRender}>
      <div className={styles.detailsRight}>
        <div className={styles.avisory}>
          <div className={styles.helmet} />
          <div className={styles.alert}>
            <div
              className={styles.emailInsert}
            >{`*Remember that Tech Returns currently only supports the regions, England, Wales & Scotland.`}</div>
          </div>
        </div>
      </div>
      <div className={styles.detailsRight1}>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <input placeholder="Event Title" type="text"></input>
          </div>
        </div>
        <div className={styles.setDateDropdowns}><div className={styles.eventTitle}>
          <select
            className={styles.eventName}
            name="event_type"
            id="event_type"
          >
            <option value="Remote" disabled selected>
              Select Event Type
            </option>
            <option value="Remote">Hackathon</option>
            <option value="In-Person">Webinar</option>
            <option value="In-Person">Job Fair</option>
          </select>
        </div>
        <div className={styles.eventTitle}>
          <select
            className={styles.eventName}
            name="location_type"
            id="location_type"
          >
            <option value="Remote" disabled selected>
              Select Location Type
            </option>
            <option value="Remote">Remote</option>
            <option value="In-Person">In-Person</option>
          </select>
        </div> </div>
        <div className={styles.setDateDropdowns}>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              <input type="date"></input> <input type="time"></input>
            </div>
          </div>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              <input type="date"></input> <input type="time"></input>
            </div>
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <input
              placeholder="Address/ Virtual Meeting Link"
              type="text"
            ></input>
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <select className={styles.eventName} name="region" id="region">
              <option value="England" disabled selected>
                Select Region
              </option>
              <option value="England">England</option>
              <option value="Wales">Wales</option>
              <option value="Scotland">Scotland</option>
            </select>
          </div>
        </div>
        <div className={styles.setDateDropdowns}>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              <input type="number" placeholder="Capacity"></input>
            </div>
          </div>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              £<input type="number" placeholder="Price"></input>
            </div>
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <textarea placeholder="Provide details about the event..."></textarea>
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName} style={{flexDirection: "column"}} > <label>Event Image URL :  </label>
			<input type="text" placeholder="www.example.com/image.png"></input></div>
        </div>
        <div className={styles.signInBtn}>
          <div className={styles.eventName}>Create Event</div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventTool;
