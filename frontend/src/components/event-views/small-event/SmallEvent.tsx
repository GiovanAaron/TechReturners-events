import { FunctionComponent } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import styles from "./SmallEvent.module.css";
import { getRandomImageAll } from "../../../utils/randomImageGenerator";
import randomImages from "../../../assets/loremipsum/random_event_image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface SmallEventProps {
  city: string;
  date: string;
  category: string;
  title: string;
  location_type: string;
  id: string; // Assuming each event has an id
}

const SmallEvent: FunctionComponent<SmallEventProps> = ({
  city,
  date,
  category,
  title,
  location_type,
  id, // Receive the id as a prop
}) => {
  const randomImage = getRandomImageAll(randomImages.imagesFlat);

  return (
    // Wrap the entire component with a Link to make it clickable
    <Link to={`/events/${id}`} className={styles.parent}>
      <div className={styles.smallEvent}>
        <img className={styles.eventImage} alt="" src={randomImage} />
        <div className={styles.gradientOveraly} />
        <div className={styles.dateAndLocation}>
          <div className={styles.city}>
            {city !== null ? city + "," : <span>&nbsp;</span>}
          </div>
          <div className={styles.date}>
            <CalendarMonthIcon sx={{ color: "#FEF175", maxHeight: "1.15rem" }} />
            <div className={styles.dateText}>{date}</div>
          </div>
        </div>
        <div className={styles.eventTypeTags}>
          <div className={styles.EventType}>
            {category !== null && (
              <div className={styles.EventTypeTxt}>{category}</div>
            )}
          </div>
          {location_type === "Virtual" && (
            <div className={styles.virtual}>
              <div className={styles.virtual1}>VIRTUAL</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.titleOfEvent}>{title}</div>
    </Link>
  );
};

export default SmallEvent;
