import { FunctionComponent } from "react";
import styles from "./SmallEvent.module.css";
import calendarvector from "../../../assets/small_calendar.svg"
import { getRandomImageAll } from "../../../utils/randomImageGenerator";
import randomImages from "../../../assets/loremipsum/random_event_image";



interface SmallEventProps {
    region: string;
    date: string;
    eventType: string;
    title: string
  }



const SmallEvent:FunctionComponent<SmallEventProps> = ({region, date, eventType, title}) => {

    const randomImage = getRandomImageAll(randomImages.imagesFlat);
    

    return (
    <div className={styles.parent}>
    <div className={styles.smallEvent}>
    <img className={styles.eventImage} alt="" src={randomImage} />
    <div className={styles.gradientOveraly} />
    <div className={styles.dateAndLocation}>
    <div className={styles.region}>{region}</div>
    <div className={styles.date}>
    <img className={styles.calendarVectorIcon} alt="" src={calendarvector} />
    <div className={styles.dateText}>17th Mar 2025</div>
    </div>
    </div>
    <div className={styles.eventTypeTags}>
    <div className={styles.EventType}>
    <div className={styles.EventTypeTxt}>{eventType}</div>
    </div>
    <div className={styles.virtual}>
    <div className={styles.virtual1}>VIRTUAL</div>
    </div>
    </div>
    </div>
    <div className={styles.titleOfEvent}>Title of Event</div>
    </div>
    

);
    };
export default SmallEvent;