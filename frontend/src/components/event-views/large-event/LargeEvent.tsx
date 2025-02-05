import { FunctionComponent } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import styles from "./LargeEvent.module.css";
import { getRandomImageAll } from "../../../utils/randomImageGenerator";
import randomImages from "../../../assets/loremipsum/random_event_image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface LargeEventProps {
  city: string;
  date: string;
  category: string;
  title: string;
  location_type: string;
  id: string;
  googleformat: string;
  description: string;
  address: string;
  region: string;
  price: number;
}

const LargeEvent: FunctionComponent<LargeEventProps> = ({
  city,
  date,
  price,
  category,
  title,
  location_type,
  id,
  googleformat,
  description,
  address,
  region
}) => {
  const randomImage = getRandomImageAll(randomImages.imagesFlat);

  console.log("LargeEvent Props:", { city, date, price, category, title, location_type, id, googleformat, description, address, region });

  return (
    // Wrap the entire component with a Link to make it clickable
    <div className={styles.eventsDetails}>
      <div className={styles.detailsLeft}>
        <div className={styles.titleSubhead}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subeading}>{title}</div>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.dateTag}>
          <div className={styles.date}>Date:</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.dateTag}>
          <div className={styles.date}>Price:</div>
          <div className={styles.date}>{price}</div>
        </div>
        <div className={styles.getTickets}>
          <div className={styles.date}>Get Tickets</div>
        </div>
      </div>
      <div className={styles.detailsRight}>
        <div className={styles.eventImageParent}>
          <img className={styles.eventImageIcon} alt="" src={randomImage} />
          <div className={styles.gradient} />
          <div className={styles.eventTag}>
            <div className={styles.eventTypeTag}>
              <div className={styles.eventType}>{category}</div>
            </div>
            <div className={styles.virtual}>
              <div className={styles.date}>VIRTUAL</div>
            </div>
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

