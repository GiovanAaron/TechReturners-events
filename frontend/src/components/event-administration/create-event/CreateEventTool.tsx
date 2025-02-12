import React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./CreateEventTool.module.css";
import createDateString from "../../../utils/createSQLDate";
import useApiReq from "../../../hooks/useApiReq";
import { defaultStart, defaultEnd } from "../../../utils/defaultDate";

const CreateEventTool: FunctionComponent = () => {
  const authToken = localStorage.getItem("authToken");

  const normalLabel = { color: "normal" };
  const warningLabel = { color: "#db3c3c" };

  const [firstSubmit, setFirstSubmit] = useState(false);

  const [requiredData, setRequiredData] = useState({
    title: true,
    category: true,
    location_type: true,
    tickets_remaining: true,
    description: true,
    photo_1_url: true,
  });

  

  // Define a single state object to manage all form fields
  const [formData, setFormData] = useState({
    title: null,
    category: "",
    location_type: "",
    startDate: defaultStart().dateOnly,
    startTime: defaultStart().timeOnly,
    endDate: defaultEnd().dateOnly,
    endTime: defaultEnd().timeOnly,
    address: null,
    region: "",
    tickets_remaining: null,
    price: 0,
    description: null,
    photo_1_url: null,
    city: "",
  });

  // Handle input changes for all fields
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log(formData);
  };

  useEffect(() => {
    if (firstSubmit) {
      setRequiredData((prev) => {
        const updatedRequiredData = { ...prev };
  
        for (let key in updatedRequiredData) {
          if (formData[key] === null || formData[key] === "") {
            updatedRequiredData[key] = false;
          } else {
            updatedRequiredData[key] = true;
          }
        }
  
        return updatedRequiredData;
      });
    }
  }, [firstSubmit, formData])

  // console.log(formData.startDate + "T" + formData.startTime + ":00Z");
  const { makeRequest } = useApiReq();
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Prepare the data for the POST request

    setFirstSubmit(true);

    const eventData = {
      ...formData,

      start_datetime: formData.startDate + "T" + formData.startTime + ":00Z",
      end_datetime: formData.endDate + "T" + formData.endTime + ":00Z",
    };

    try {
      // console.log("authToken", authToken);
      const { newEvent } = await makeRequest(
        "/events",
        "POST",
        {
          ...eventData,
          owner_id: 3,
          capacity: eventData.tickets_remaining,
        },
        authToken
      );

      window.location.href = `/events/${newEvent.id}`;
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <div className={styles.loginRender}>
      <div className={styles.leftCol}>
        <div className={styles.basicInput}>
          <label className={styles.label} htmlFor="Title" style={requiredData.title && !firstSubmit ? normalLabel : warningLabel}>
            (Required)
          </label>
          <input
            placeholder="Event Title"
            type="text"
            name="title"
            value={formData.title ?? ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.colSplit}>
          <div className={styles.basicInput}>
            <label style={!firstSubmit && requiredData.category ? normalLabel : warningLabel}>(Required)</label>
            <select
              className={styles.basicInput}
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Event Type
              </option>
              <option value="Hackathon">Hackathon</option>
              <option value="Webinar">Webinar</option>
              <option value="Job Fair">Job Fair</option>
            </select>
          </div>
          <div className={styles.basicInput}>
            <label style={!firstSubmit && requiredData.location_type ? normalLabel : warningLabel}>(Required)</label>
            <select
              className={styles.basicInput}
              name="location_type"
              value={formData.location_type}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Location Type
              </option>
              <option value="Remote">Remote</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>
        </div>
        <div className={styles.colSplit}>
          <label className={styles.dateLabel} htmlFor="Title">
            <p>(Required)</p>
            <div className={styles.dateInput}>
              <label>
                Start Date
                <input
                  type="date"
                  name="startDate"
                  value={
                    formData.startDate || new Date().toISOString().split("T")[0]
                  }
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Start Time
                <input
                  type="time"
                  name="startTime"
                  value={
                    formData.startTime ||
                    new Date().toISOString().split("T")[1].slice(0, -8)
                  }
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </label>
          <label className={styles.dateLabel} htmlFor="Title">
            {" "}
            <p>(Required)</p>
            <div className={styles.dateInput}>
              <label>
                End Date
                <input
                  type="date"
                  name="endDate"
                  value={
                    formData.endDate || new Date().toISOString().split("T")[0]
                  }
                  onChange={handleInputChange}
                />
              </label>
              <label>
                End Time
                <input
                  type="time"
                  name="endTime"
                  value={
                    formData.endTime ||
                    new Date().toISOString().split("T")[1].slice(0, -8)
                  }
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </label>
        </div>

        <div className={styles.basicInput} style={{ marginTop: ".6rem" }}>
          <input
            placeholder="Address/ Virtual Meeting Link"
            type="text"
            name="address"
            value={formData.address ?? ""}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.colSplit} style={{ marginTop: ".6rem" }}>
          <div className={styles.basicInput}>
            <select
              className={styles.basicInput}
              name="region"
              value={formData.region}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Region
              </option>
              <option value="England">England</option>
              <option value="Wales">Wales</option>
              <option value="Scotland">Scotland</option>
            </select>
          </div>
          <div className={styles.basicInput}>
            <select
              className={styles.basicInput}
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select City
              </option>
              <option value="" disabled>
                -- England --
              </option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Birmingham">Birmingham</option>
              <option value="Leeds">Leeds</option>
              <option value="Bristol">Bristol</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Newcastle upon Tyne">Newcastle upon Tyne</option>
              <option value="" disabled>
                -- Wales --
              </option>
              <option value="Cardiff">Cardiff</option>
              <option value="Swansea">Swansea</option>
              <option value="Newport">Newport</option>
              <option value="" disabled>
                -- Scotland --
              </option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="Glasgow">Glasgow</option>
              <option value="Dundee">Dundee</option>
            </select>
          </div>
        </div>

        <div className={styles.basicInput} style={{ marginTop: ".6rem" }}>
          <label style={!firstSubmit && requiredData.photo_1_url ? { paddingTop: "0", marginTop: "-.5rem", color: normalLabel.color } : { paddingTop: "0", marginTop: "-.5rem", color: warningLabel.color }}>
            (Required)
          </label>
          <input
            placeholder="Photo URL (.JPG, .PNG, .GIF)"
            type="text"
            name="photo_1_url"
            value={formData.photo_1_url ?? ""}
            onChange={handleInputChange}
          />
        </div>

        <button
          className={styles.signInBtn}
          onClick={handleSubmit}
          style={{ marginTop: ".6rem" }}
        >
          <div className={styles.eventName}>Create Event</div>
        </button>
      </div>
      <form>
        <div className={styles.rightCol}>
          <textarea
            className={styles.eventDetails}
            placeholder="Provide details about the event..."
            name="description"
            value={formData.description ?? ""}
            onChange={handleInputChange}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "end",
            }}
          >
            <div className={styles.price}>
              <p>£ </p>
              <input
                className={styles.price}
                type="number"
                placeholder="0"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <label>
              {" "}
              <p
                style={{
                  margin: "0",
                  paddingBottom: ".2rem",
                  paddingLeft: ".6rem",
                  fontSize: ".9rem",
                  color: "#b2b2b2",
                }}
              >
                (Required)
              </p>
              <input
                className={styles.capacity}
                type="number"
                placeholder="Capacity"
                name="tickets_remaining"
                value={formData.tickets_remaining ?? ""}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEventTool;
