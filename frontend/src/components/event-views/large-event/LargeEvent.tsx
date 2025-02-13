import React from "react";
import styles from "./LargeEvent.module.css";
import { arrayRandomizer } from "../../../utils/arrayRandomizer";
import randomImages from "../../../assets/loremipsum/random_event_image";
import subheadings from "../../../assets/loremipsum/random_event_subheading";
import randomEventDesc from "../../../assets/loremipsum/random_event_desc"
import { genGoogleCalLink } from "../../../utils/googleCalFormat";

interface LargeEventProps {
  city: string;
  date: string;
  category: string;
  title: string;
  location_type: string;
  id: string;
  description: string;
  address: string;
  region: string;
  price: number | string;
  startTime: string;
  endTime: string;
}

const LargeEvent: React.FC <LargeEventProps> = ({
  city,
  date,
  price,
  category,
  title,
  location_type,
  id,
  startTime,
  description,
  address,
  region,
  endTime,
}) => {
  const randomImage = arrayRandomizer(randomImages.imagesFlat);
  const randomSubheading = arrayRandomizer(subheadings.flattened)

  // console.log("LargeEvent Props:", {
  //   city,
  //   date,
  //   price,
  //   category,
  //   title,
  //   location_type,
  //   id,
  //   startTime,
  //   description,
  //   address,
  //   region,
  //   endTime,
  // });

  return (
    // Wrap the entire component with a Link to make it clickable
    <div className={styles.eventsDetails}>
      <div className={styles.detailsLeft}>
        <div className={styles.titleSubhead}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subeading}>{randomSubheading}</div>
        </div>
        <div className={styles.description}>{description} {arrayRandomizer(randomEventDesc)} {arrayRandomizer(randomEventDesc)}</div>
        <div className={styles.dateTag}>
          <div className={styles.date}>Date:</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.dateTag}>
          <div className={styles.date}>Price:</div>
          <div className={styles.date}>{price !== "Free" ? `£${price}` : price }</div>
        </div>
        <a
          href={genGoogleCalLink(
            startTime,
            endTime,
            title,
            description,
            address
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.getTickets}
        >
          <div className={styles.date}>Add to My Calendar</div>
        </a>
      </div>
      <div className={styles.detailsRight}>
        <div className={styles.eventImageParent}>
          <img className={styles.eventImageIcon} alt="" src={randomImage} />
          <div className={styles.gradient} />
          <div className={styles.eventTag}>
            <div className={styles.eventTypeTag}>
              <div className={styles.eventType}>{category}</div>
            </div>
            {location_type === "Remote" ? (
              <div className={styles.virtual}>
                <div className={styles.date}>VIRTUAL</div>
              </div>
            ) : (
              null
            )}
          </div>
        </div>
        <div className={styles.location}>
          <div className={styles.address}>{address}</div>
          <div className={styles.region}>{region}</div>
        </div>
      </div>
    </div>
  );
};

export default LargeEvent;
