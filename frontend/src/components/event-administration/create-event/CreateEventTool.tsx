import { FunctionComponent, useState } from "react";
import styles from "./CreateEventTool.module.css";
import createDateString from "../../../utils/createSQLdate";
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
    eventImageUrl: "",
	city: ""
  });

  // Handle input changes for all fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

	console.log(formData)
  };


  const {makeRequest} = useApiReq();
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
	event.preventDefault()
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
      imageUrl: formData.eventImageUrl,
	  city: formData.city
    };


	const formattedStartDate = createDateString(formData.startDate, formData.startTime);
	const formattedEndDate = createDateString(formData.endDate, formData.endTime);

	try {
		console.log("authToken", authToken);
	const {responseData} = await makeRequest("/events", "POST", {
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

	}, authToken );

	console.log(responseData)
	
  } catch (error) {
	console.error("Failed to create event:", error);
  }}

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
	  <form>
      <div className={styles.detailsRight1}>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <input
              placeholder="Event Title"
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.setDateDropdowns}>
          <div className={styles.eventTitle}>
            <select
              className={styles.eventName}
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
          <div className={styles.eventTitle}>
            <select
              className={styles.eventName}
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
        <div className={styles.setDateDropdowns}>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <input
              placeholder="Address/ Virtual Meeting Link"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <select
              className={styles.eventName}
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
          <div className={styles.eventName}>
            <select
              className={styles.eventName}
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select City
              </option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Birmingham">Birmingham</option>
              <option value="Leeds">Leeds</option>
              <option value="Bristol">Bristol</option>
              <option value="Cambridge">Cambridge</option>
              <option value="Newcastle upon Tyne">Newcastle upon Tyne</option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="Glasgow">Glasgow</option>
              <option value="Dundee">Dundee</option>
              <option value="Cardiff">Cardiff</option>
              <option value="Swansea">Swansea</option>
              <option value="Newport">Newport</option>
            </select>
          </div>
        </div>
        <div className={styles.setDateDropdowns}>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              <input
                type="number"
                placeholder="Capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.startDate}>
            <div className={styles.eventName}>
              £
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName}>
            <textarea
              placeholder="Provide details about the event..."
              name="eventDetails"
              value={formData.eventDetails}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.eventTitle}>
          <div className={styles.eventName} style={{ flexDirection: "column" }}>
            <label>Event Image URL : </label>
            <input
              type="text"
              placeholder="www.example.com/image.png"
              name="eventImageUrl"
              value={formData.eventImageUrl}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className={styles.signInBtn} onClick={handleSubmit}>
          <div className={styles.eventName}>Create Event</div>
        </button>
      </div>
	  </form>
    </div>
  );
};

export default CreateEventTool;