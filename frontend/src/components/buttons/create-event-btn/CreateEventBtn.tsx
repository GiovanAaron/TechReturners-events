import React from "react";
import styles from "./CreateEventBtn.module.css"
import { Link } from "react-router-dom";


const CreateEventBtn: React.FC = () => {
    return (
        <Link to="/create-event">
            <button className={styles.createEventBtn}>Post New Event</button>
        </Link>
    )
}

export default CreateEventBtn