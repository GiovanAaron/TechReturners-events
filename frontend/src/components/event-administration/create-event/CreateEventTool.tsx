import { FunctionComponent, useState } from "react";
import styles from "./CreateEventTool.module.css";
import createDateString from "../../../utils/createSQLDate";
import useApiReq from "../../../hooks/useApiReq";

const CreateEventTool: FunctionComponent = () => {
  const authToken = localStorage.getItem("authToken");

  // Define a single state object to manage all form fields
  const [formData, setFormData] = useState({
    Title: "",
    eventType: "",
    Location_Type: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    address: "",
    region: "",
    capacity: "",
    price: "",
    eventDetails: "",
    ImageUrl: "",
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

    console.log(formData);
  };

  const { makeRequest } = useApiReq();
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Prepare the data for the POST request
    const eventData = {
      title: formData.Title,
      type: formData.eventType,
      Location_Type: formData.Location_Type,
      startDateTime: `${formData.startDate}T${formData.startTime}:00`, // Combine date and time
      endDateTime: `${formData.endDate}T${formData.endTime}:00`, // Combine date and time
      address: formData.address,
      region: formData.region,
      capacity: parseInt(formData.capacity, 10),
      price: parseFloat(formData.price),
      details: formData.eventDetails,
      imageUrl: formData.ImageUrl,
      city: formData.city,
    };

    const formattedStartDate = createDateString(
      formData.startDate,
      formData.startTime
    );
    const formattedEndDate = createDateString(
      formData.endDate,
      formData.endTime
    );

    try {
      console.log("authToken", authToken);
      const { responseData } = await makeRequest(
        "/events",
        "POST",
        {
          owner_id: 3,
          title: eventData.title,
          description: eventData.details,
          category: eventData.type,
          start_datetime: formattedStartDate,
          end_datetime: formattedEndDate,
          location_type: eventData.Location_Type,
          price: eventData.price,
          photo_1_url: eventData.imageUrl,
          region: eventData.region,
          city: eventData.city,
          address: eventData.address,
          tickets_remaining: eventData.capacity,
          capacity: eventData.capacity,
        },
        authToken
      );

      console.log(responseData);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <div className={styles.loginRender}>
      <div className={styles.leftCol}>
        <div className={styles.basicInput}>
          <label className={styles.label} htmlFor="Title">Event Title (Required)</label>
          <input
            placeholder="Event Title"
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            required
            // className={styles.basicInput}
          />
        </div>

        <div className={styles.colSplit}>
          <div className={styles.basicInput}>
            <label>Event Type</label>
            <select
              className={styles.basicInput}
              name="eventType"
              value={formData.eventType}
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
          <label>Location Type</label>
            <select
              className={styles.basicInput}
              name="Location_Type"
              value={formData.Location_Type}
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
          <div className={styles.dateInput}>
            <label>Start Date
            <input
              type="date"
              name="startDate"
              value={
                formData.startDate || new Date().toISOString().split("T")[0]
              }
              onChange={handleInputChange}
            />
             </label>
             <label>Start Time
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

          <div className={styles.dateInput}>
            <label>End Date</label>
            
            <input
              type="date"
              name="endDate"
              value={formData.endDate || new Date().toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
            <label>End Time
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
        </div>

        <div className={styles.basicInput}>
          <input
            placeholder="Address/ Virtual Meeting Link"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.colSplit}>
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
              <option value="" disabled>-- England --</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Birmingham">Birmingham</option>
              <option value="Leeds">Leeds</option>
              <option value="Bristol">Bristol</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Newcastle upon Tyne">Newcastle upon Tyne</option>
              <option value="" disabled>-- Wales --</option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="Glasgow">Glasgow</option>
              <option value="Dundee">Dundee</option>
              <option value="" disabled>-- Scotland --</option>
              <option value="Cardiff">Cardiff</option>
              <option value="Swansea">Swansea</option>
              <option value="Newport">Newport</option>
            </select>
          </div>
        </div>

        <div className={styles.basicInput}>
          <input
            placeholder="Photo URL (.JPG, .PNG, .GIF)"
            type="text"
            name="imageUrl"
            value={formData.ImageUrl}
            onChange={handleInputChange}
            // className={styles.basicInput}
          />
        </div>

        <button className={styles.signInBtn} onClick={handleSubmit}>
          <div className={styles.eventName}>Create Event</div>
        </button>
      </div>
      <form>
        <div className={styles.rightCol}>
          <textarea
            className={styles.eventDetails}
            placeholder="Provide details about the event..."
            name="eventDetails"
            value={formData.eventDetails}
            onChange={handleInputChange}
          />

          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
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
            <input
              className={styles.capacity}
              type="number"
              placeholder="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEventTool;
